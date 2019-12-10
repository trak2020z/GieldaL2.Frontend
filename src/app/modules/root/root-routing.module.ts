import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StockComponent } from './pages/stock/stock.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent as UserMainComponent } from '../user/components/main/main.component';
import { CreateBuyOfferComponent } from '../offer/pages/create-buy-offer/create-buy-offer.component';
import { AuthGuard } from '../../_guards/auth.guard';
import { CreateSellOfferComponent } from '../offer/pages/create-sell-offer/create-sell-offer.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stock', component: StockComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', loadChildren: '../user/user.module#UserModule', canActivate: [AuthGuard] },
  { path: 'offer', loadChildren: '../offer/offer.module#OfferModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule {
}

