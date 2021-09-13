import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ProductsService } from 'src/app/shared/database/products.service';
import * as actions from './products.actions';

@Injectable()
export class ProductsEffects {

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadProducts),
    mergeMap(() => this.productDatabaseService.getProducts().pipe(
      map(products => actions.loadProductsSuccess({products})),
      catchError((error) => of(actions.loadProductsFailure({error})))
    ))
  ));

  constructor(private actions$: Actions, private productDatabaseService: ProductsService) {}

}

