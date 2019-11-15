import { NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { HomeComponent } from './pages/home/home.component';
import { StaticSidebarComponent } from './components/static-sidebar/static-sidebar.component';
import { StockComponent } from './pages/stock/stock.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatTableModule, MatSortModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatStepperModule, MatSnackBarModule, MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { MiniCalendarModule } from 'mini-calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RootRoutingModule } from './root-routing.module';
import { UserModule } from '../user/user.module';




@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    HomeComponent,
    StaticSidebarComponent,
    StockComponent,
    RegisterComponent,
    LoginFormComponent
  ],
  imports: [
    RootRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
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
    FormsModule,
    ReactiveFormsModule,
    UserModule
  ],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class RootModule { }
