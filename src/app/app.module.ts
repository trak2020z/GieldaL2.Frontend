import { NgModule } from '@angular/core';
import { MatButtonModule, 
  MatIconModule, 
  MatMenuModule, 
  MatSidenavModule, 
  MatSortModule, 
  MatToolbarModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MiniCalendarModule } from 'mini-calendar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { StaticSidebarComponent } from './components/static-sidebar/static-sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { StockComponent } from './pages/stock/stock.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    HomeComponent,
    StaticSidebarComponent,
    StockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
