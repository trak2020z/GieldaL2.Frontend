import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/_models/stock.model';
import { Offer } from 'src/app/_models/offer.model';
import { User } from 'src/app/_models/user.model';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from 'src/app/_services/stock.service';
import { ContextService } from 'src/app/_services/context.service';
import { OffersService } from 'src/app/_services/offer.service';
import { MatSnackBar } from '@angular/material';
import { forkJoin } from 'rxjs';
import { ApiResponse } from 'src/app/_models/apiResponse';
import { Share } from 'src/app/_models/share.model';
import { SHARE } from 'src/app/_mocks/shareMock';

@Component({
  selector: 'app-create-sell-offer',
  templateUrl: './create-sell-offer.component.html',
  styleUrls: ['./create-sell-offer.component.scss']
})
export class CreateSellOfferComponent implements OnInit {
  /**
   * Selected Stock id
   */
  stockId: number;
  /**
 * Selected share id
 */
  shareId: number;
  /**
   * Selected stock data
   */
  stockData: Stock;
  /**
   * Selected share data
   */
  shareData: Share = new Share;
  /**
   * Sell offer object to post 
   */
  sellOffer: Offer;
  /**
   * currently logged user
   */
  user: User;
  /**
   * @ignore
   */
  sellForm: FormGroup;
  /**
   * Summary offer value
   */
  sumValue: number = 0;

  serviceStatus: string;

  /**
   * Constructor injecting dependencies
   * @param route 
   * @param stockService 
   * @param location 
   * @param formBuilder 
   * @param contextService 
   * @param offersService 
   * @param snackBar 
   * @param router
   */
  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    private formBuilder: FormBuilder,
    private contextService: ContextService,
    private offersService: OffersService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Gets param passed from previous component.
   * Initialize new form group with validators.
   */
  ngOnInit() {
    this.shareData.amount = 0;
    this.stockId = +this.route.snapshot.paramMap.get('stockId');
    this.shareId = +this.route.snapshot.paramMap.get('shareId');
    this.getData();
    this.sellOffer = new Offer();
    this.sellForm = this.formBuilder.group({
      amount: new FormControl(this.sellOffer.amount, [Validators.required, Validators.min(1), (control: AbstractControl) => Validators.max(this.shareData.amount)(control)]),
      price: new FormControl(this.sellOffer.price, [Validators.required, Validators.min(0)]),
    });
  }

  /**
   * Get user, stock and user share data from API
   */
  getData() {
    this.serviceStatus = 'loading'
    forkJoin([
      this.stockService.getStock(this.stockId),
      this.contextService.getContext()
    ])
      .subscribe(([s, c]: [ApiResponse, ApiResponse]) => {
        this.stockData = s.data;
        this.user = c.data.user;
        this.shareData = c.data.shares.find(share => share.stockId == this.stockId);
        this.serviceStatus = 'OK'
      },
        error => {
          this.serviceStatus = 'error'
        })
  }

  /**
   * When button "Back" is pressed go to stock Component
   */
  goBack() {
    this.router.navigate(['user/shares']);
  }

  /**
   * Validate if user have enough money to make an offer. If validated succesfully create offer object, and send it to API
   */
  createOffer() {
    this.sellOffer.userId = this.user.id;
    this.sellOffer.shareId = this.shareId;
    this.sellOffer.amount = this.sellForm.controls['amount'].value
    this.sellOffer.price = this.sellForm.controls['price'].value
    this.sellOffer.date = new Date().toUTCString();;
    console.log(this.sellOffer);

    this.offersService.createSellOffer(this.sellOffer).subscribe(
      d => {
        this.snackBar.open("Sell offer added sucesfully", "Close", {
          duration: 5000,
        })
        this.router.navigate(['stock']);
      },
      err => {
        this.snackBar.open("Couldn't create offer: Service is temporarily not available.", "Close", {
          duration: 5000,
        })
        this.router.navigate(['stock']);
      }
    );
  }

  /**
   * @ignore
   * @param form 
   */
  isValidForm(form: FormGroup) {
    return form.valid;
  }

  /**
   * Updates final offer value
   */
  updateSumValue() {
    if (this.sellForm.valid)
      this.sumValue = this.sellForm.controls['amount'].value * this.sellForm.controls['price'].value;
    else this.sumValue = 0;

  }
}

