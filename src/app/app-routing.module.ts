import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {StockComponent} from './pages/stock/stock.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'stock', component: StockComponent},
  {path: 'login', component: LoginFormComponent},
  { path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
