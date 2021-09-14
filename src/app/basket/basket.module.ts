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
import { MatDialogConfig, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
const Material = [MatButtonModule, MatIconModule, MatTooltipModule, MatSidenavModule, MatDialogModule, MatInputModule, MatFormFieldModule];
//#endregion

import { ElementComponent } from './element/element.component';
import { BuyDialogComponent } from './buy-dialog/buy-dialog.component';
import { BuyDialogService } from './buy-dialog/buy-dialog.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumberDirective } from './buy-dialog/only-number.directive';
@NgModule({
  declarations: [
    BasketComponent,
    ElementComponent,
    BuyDialogComponent,
    OnlyNumberDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Material,
    StoreModule.forFeature(basketFeatureKey, reducer),
    EffectsModule.forFeature([BasketEffects]),
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: <MatDialogConfig>{
        ...new MatDialogConfig(),
        width: '350px'
      }
    },
    BuyDialogService
  ],
  exports: [
    BasketComponent
  ]
})
export class BasketModule { }
