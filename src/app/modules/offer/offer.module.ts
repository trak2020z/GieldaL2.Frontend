import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBuyOfferComponent } from './pages/create-buy-offer/create-buy-offer.component';
import { MatButtonModule, MatCardModule, MatGridListModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSellOfferComponent } from './pages/create-sell-offer/create-sell-offer.component';
import { OfferRoutingModule } from './offer-routing.module';
import { OfferMainComponent } from './components/offer-main/offer-main.component';



@NgModule({
  declarations: [CreateBuyOfferComponent, CreateSellOfferComponent, OfferMainComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    OfferRoutingModule
  ],
  exports: [
    CreateBuyOfferComponent,
    CreateSellOfferComponent
  ]
})
export class OfferModule { }
