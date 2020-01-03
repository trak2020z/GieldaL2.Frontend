import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceStatusComponent } from './service-status/service-status.component';
import { MatProgressSpinnerModule, MatCardModule } from '@angular/material';



@NgModule({
  declarations: [ServiceStatusComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  exports: [
    ServiceStatusComponent
  ]
})
export class SharedModule { }
