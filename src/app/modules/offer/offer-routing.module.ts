import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBuyOfferComponent } from './pages/create-buy-offer/create-buy-offer.component';
import { CreateSellOfferComponent } from './pages/create-sell-offer/create-sell-offer.component';
import { OfferMainComponent } from './components/offer-main/offer-main.component';


const routes: Routes = [
    {
        path: '',
        component: OfferMainComponent,
        children: [
            { path: 'createBuy/:stockId', component: CreateBuyOfferComponent },
            { path: 'createSell/:stockId', component: CreateSellOfferComponent }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OfferRoutingModule { }