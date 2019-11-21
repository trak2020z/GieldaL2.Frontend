import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent as UserMainComponent } from './components/main/main.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { UserBuyOffersComponent } from './components/user-buy-offers/user-buy-offers.component';
import { UserSellOffersComponent } from './components/user-sell-offers/user-sell-offers.component';
const routes: Routes = [
    {
        path: '',
        component: UserMainComponent,
        children: [
            { path: '', redirectTo: 'edit', pathMatch: 'full' },
            { path: 'edit', pathMatch: 'full', component: UserEditComponent },
            { path: 'history', component: UserHistoryComponent },
            { path: 'buyoffers', component: UserBuyOffersComponent },
            { path: 'selloffers', component: UserSellOffersComponent },
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class userRoutingModule { }