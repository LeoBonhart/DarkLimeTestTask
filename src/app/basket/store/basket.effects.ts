import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map} from 'rxjs/operators';
import * as actions from './basket.actions';
import { selectLastBasketId } from './basket.selectors';


@Injectable()
export class BasketEffects {

  updateDate$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addToBasket, actions.clearBasket, actions.removeFromBasket, actions.updateBasket),
    map(() => actions.updateDate({date: Date.now()}))
  ));

  addToBasket$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addToBasket),
    concatLatestFrom(action => this.store$.select(selectLastBasketId)),
    map(([,id]) => actions.increaseProductInBasket({id}))
  ));

  constructor(private actions$: Actions, private store$: Store) {}

}
