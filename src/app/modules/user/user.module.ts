import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatTableModule, MatSortModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatStepperModule, MatSnackBarModule, MatCardModule, MatProgressSpinnerModule, MatButtonToggleModule, MatDialogModule, MatPaginatorModule } from '@angular/material';
import { MiniCalendarModule } from 'mini-calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { userRoutingModule } from './user-routing.module';
import { MainComponent } from './components/main/main.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UserHistoryComponent } from './pages/user-history/user-history.component';
import { UserBuyOffersComponent } from './pages/user-buy-offers/user-buy-offers.component';
import { UserSellOffersComponent } from './pages/user-sell-offers/user-sell-offers.component';
import { UserSharesComponent } from './pages/user-shares/user-shares.component';
import { SharedModule } from '../_shared/shared.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    MainComponent,
    UserEditComponent,
    UserHistoryComponent,
    UserBuyOffersComponent,
    UserSellOffersComponent,
    UserSharesComponent,
    ConfirmDialogComponent],
  imports: [
    userRoutingModule,
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
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FlexLayoutModule,
    SharedModule,
    MatPaginatorModule
  ],
  entryComponents: [UserSellOffersComponent, ConfirmDialogComponent],
  bootstrap: [MainComponent]
})
export class UserModule { }
