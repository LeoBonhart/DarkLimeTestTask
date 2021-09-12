import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { StoreModule } from '@ngrx/store';
import { basketFeatureKey, reducer } from './store/basket.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BasketEffects } from './store/basket.effects';


@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(basketFeatureKey, reducer),
    EffectsModule.forFeature([BasketEffects]),
  ],
  exports: [
    BasketComponent
  ]
})
export class BasketModule { }
