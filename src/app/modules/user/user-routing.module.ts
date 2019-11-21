import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent as UserMainComponent } from './components/main/main.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UserHistoryComponent } from './pages/user-history/user-history.component';
import { UserBuyOffersComponent } from './pages/user-buy-offers/user-buy-offers.component';
import { UserSellOffersComponent } from './pages/user-sell-offers/user-sell-offers.component';
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