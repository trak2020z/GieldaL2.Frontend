import { NgModule } from '@angular/core';
import { RootModule } from './modules/root/root.module';
import { AppComponent } from './modules/root/components/app.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Interceptor} from './modules/root/components/app.interceptor';

@NgModule({
  declarations: [

  ],
  imports: [RootModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
