import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StockService } from 'src/app/_services/stock.service';
import { Stock } from 'src/app/_models/stock.model';
import { ApiResponse } from 'src/app/_models/apiResponse';
import { Offer } from 'src/app/_models/offer.model';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators, NgForm } from '@angular/forms';
import { ContextService } from 'src/app/_services/context.service';
import { forkJoin } from 'rxjs';
import { OffersService } from 'src/app/_services/offer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GridColumnStyleBuilder } from '@angular/flex-layout/grid/typings/column/column';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-create-buy-offer',
  templateUrl: './create-buy-offer.component.html',
  styleUrls: ['./create-buy-offer.component.scss']
})
export class CreateBuyOfferComponent implements OnInit {
  /**
   * Selected Stock id
   */
  stockId: number;
  /**
   * Selected stock data
   */
  stockData: Stock;
  /**
   * Buy offer object to post 
   */
  buyOffer: Offer;
  /**
   * currently logged user id
   */
  user: User;
  /**
   * @ignore
   */
  buyForm: FormGroup;
  /**
   * Summary offer value
   */
  sumValue: number = 0;

  /**
   * Constructor injecting dependencies
   * @param route 
   * @param stockService 
   * @param location 
   * @param formBuilder 
   * @param contextService 
   * @param offersService 
   * @param snackBar 
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
    this.stockId = +this.route.snapshot.paramMap.get('stockId');
    this.getData();
    this.buyOffer = new Offer();
    this.buyForm = this.formBuilder.group({
      amount: new FormControl(this.buyOffer.amount, [Validators.required, Validators.min(1)]),
      price: new FormControl(this.buyOffer.price, [Validators.required, Validators.min(0)]),
    });
  }

  /**
   * Download userid and stock data from API
   */
  getData() {
    forkJoin([
      this.stockService.getStock(this.stockId),
      this.contextService.getContext()
    ])
      .subscribe(([s, c]: [ApiResponse, ApiResponse]) => {
        this.stockData = s.data
        this.user = c.data.user
      })
  }

  /**
   * When button "Back" is pressed go to stock Component
   */
  goBack() {
    this.router.navigate(['stock']);
  }

  /**
   * Validate if user have enough money to make an offer. If validated succesfully create offer object, and send it to API
   */
  createOffer() {
    if (this.sumValue <= this.user.value) {
      this.buyOffer.userId = this.user.id;
      this.buyOffer.stockId = this.stockId;
      this.buyOffer.amount = this.buyForm.controls['amount'].value
      this.buyOffer.price = this.buyForm.controls['price'].value
      this.buyOffer.date = new Date().toUTCString();;
      console.log(this.buyOffer);

      this.offersService.createBuyOffer(this.buyOffer).subscribe(d => {
        this.snackBar.open("Buy offer added sucesfully", "Close", {
          duration: 5000,
        });
        this.router.navigate(['stock']);
      });
    }
    else {
      this.snackBar.open("Not enough money", "Close", {
        duration: 5000,
      });
    }

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
    if (this.buyForm.valid)
      this.sumValue = this.buyForm.controls['amount'].value * this.buyForm.controls['price'].value;
    else this.sumValue = 0;

  }
}
