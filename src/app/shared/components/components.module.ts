import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingShadeComponent } from './loading-shade/loading-shade.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    LoadingShadeComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    LoadingShadeComponent
  ]
})
export class ComponentsModule { }
