import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StockService } from 'src/app/_services/stock.service';
import { Stock } from 'src/app/_models/stock.model';
import { ApiResponse } from 'src/app/_models/apiResponse';
import { BuyOffer } from 'src/app/_models/buyOffer.model';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators, NgForm } from '@angular/forms';
import { ContextService } from 'src/app/_services/context.service';
import { forkJoin } from 'rxjs';
import { OffersService } from 'src/app/_services/offer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  buyOffer: BuyOffer;
  /**
   * currently logged user id
   */
  userId: number;
  /**
   * @ignore
   */
  buyForm: FormGroup;

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
    private location: Location,
    private formBuilder: FormBuilder,
    private contextService: ContextService,
    private offersService: OffersService,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Gets param passed from previous component.
   * Initialize new form group with validators.
   */
  ngOnInit() {
    this.stockId = +this.route.snapshot.paramMap.get('stockId');
    this.getData();
    this.buyOffer = new BuyOffer();
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
        this.userId = c.data.user.id
      })
  }

  /**
   * When button "Back" is pressed go to stock Component
   */
  goBack() {
    this.location.back();
  }

  /**
   * Create offer object then send if to API via service.
   */
  createOffer() {
    this.buyOffer.userId = this.userId;
    this.buyOffer.stockId = this.stockId;
    this.buyOffer.amount = this.buyForm.controls['amount'].value
    this.buyOffer.price = this.buyForm.controls['price'].value
    this.buyOffer.date = new Date().toUTCString();;
    console.log(this.buyOffer);

    this.offersService.createBuyOffer(this.buyOffer).subscribe(d => {
      this.snackBar.open("Buy offer addes sucesfully", "Close", {
        duration: 5000,
      });
      this.location.back();
    });

  }

  /**
   * @ignore
   * @param form 
   */
  isValidForm(form: FormGroup) {
    return form.valid;
  }
}
