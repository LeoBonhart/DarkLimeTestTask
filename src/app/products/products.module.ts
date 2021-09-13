import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { StoreModule } from '@ngrx/store';
import { productsFeatureKey, reducer } from './store/products.reducer';
import { ProductsEffects } from './store/products.effects';
import { EffectsModule } from '@ngrx/effects';
import { ProductComponent } from './product/product.component';

//#region Material
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
const Material = [MatRippleModule, MatButtonModule, MatIconModule, MatTooltipModule];
//#endregion

import { ViewComponent } from './view/view.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ComponentsModule } from '../shared/components/components.module';
@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ComponentsModule,
    Material,
    StoreModule.forFeature(productsFeatureKey, reducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
