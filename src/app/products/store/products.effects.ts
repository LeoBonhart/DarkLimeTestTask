import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import * as Products from './products.actions';


@Injectable()
export class ProductsEffects {

  // updatedDate$ = createEffect(() => this.actions$.pipe(
  //   ofType(),
  //   mergeMap(() => )
  // ));

  constructor(private actions$: Actions) {}

}
