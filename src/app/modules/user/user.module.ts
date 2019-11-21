import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatTableModule, MatSortModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatStepperModule, MatSnackBarModule, MatCardModule, MatProgressSpinnerModule, MatButtonToggleModule } from '@angular/material';
import { MiniCalendarModule } from 'mini-calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { userRoutingModule } from './user-routing.module';
import { MainComponent } from './components/main/main.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { UserBuyOffersComponent } from './components/user-buy-offers/user-buy-offers.component';
import { UserSellOffersComponent } from './components/user-sell-offers/user-sell-offers.component';



@NgModule({
  declarations: [MainComponent, UserEditComponent, UserHistoryComponent, UserBuyOffersComponent, UserSellOffersComponent],
  imports: [
    userRoutingModule,
    //BrowserModule,
    //BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatSidenavModule,
    MiniCalendarModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FlexLayoutModule
  ],
  exports: [MainComponent],
  bootstrap: [MainComponent]
})
export class UserModule { }
