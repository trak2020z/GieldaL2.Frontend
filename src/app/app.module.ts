import { NgModule } from '@angular/core';
import { RootModule } from './modules/root/root.module';
import { AppComponent } from './modules/root/components/app.component';

@NgModule({
  declarations: [

  ],
  imports: [RootModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
