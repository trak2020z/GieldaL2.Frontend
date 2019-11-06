import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatSortModule, MatSidenavModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table'; 
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { HomeComponent } from './pages/home/home.component';
import { StaticSidebarComponent } from './components/static-sidebar/static-sidebar.component';
import { MiniCalendarModule } from 'mini-calendar';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    HomeComponent,
    StaticSidebarComponent
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
    MiniCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
