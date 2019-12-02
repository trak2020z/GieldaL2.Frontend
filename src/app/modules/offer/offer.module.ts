import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBuyOfferComponent } from './pages/create-buy-offer/create-buy-offer.component';
import { MatButtonModule, MatCardModule, MatGridListModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateBuyOfferComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateBuyOfferComponent
  ]
})
export class OfferModule { }
