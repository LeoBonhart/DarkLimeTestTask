import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { StoreModule } from '@ngrx/store';
import { basketFeatureKey, reducer } from './store/basket.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BasketEffects } from './store/basket.effects';

//#region Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
const Material = [MatButtonModule, MatIconModule, MatTooltipModule, MatSidenavModule];
//#endregion
@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    Material,
    StoreModule.forFeature(basketFeatureKey, reducer),
    EffectsModule.forFeature([BasketEffects]),
  ],
  exports: [
    BasketComponent
  ]
})
export class BasketModule { }
