import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector, ActionReducerMap, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as reducer from './basket.reducer';

export interface State {
  products: reducer.State;
}

export const reducers: ActionReducerMap<State> = {
  products: reducer.reducer,
};

export const selectBasketFeatureState = createFeatureSelector<reducer.State>(reducer.basketFeatureKey);

export const selectBasketTotal = createSelector(selectBasketFeatureState, reducer.selectBasketTotal);

export const selectBasketEntities = createSelector(selectBasketFeatureState, reducer.selectBasketEntities);

export const selectBasketAll = createSelector(selectBasketFeatureState, reducer.selectAllBasket);

export const selectBasketIds = createSelector(selectBasketFeatureState, reducer.selectBasketIds);

export const selectLastBasketId = createSelector(selectBasketFeatureState, (state): string => state.lastId);

export const selectBasketStatus = createSelector(selectBasketFeatureState, (state): boolean => state.openBasket);

@Injectable()
export class SelectsBasketService {

  constructor(private store$: Store) {}

  /**
   * Получение селекта количества елементов в корзине
   */
  getSelectCountBasket() {
    return this.store$.select(selectBasketAll).pipe(
      map(products => {
        let counts = products.map(product => product.count ?? 0);
        let result = counts.length > 0 ? counts.reduce((acc, count) => acc + count) : 0;
        return result;
      })
    );
  }

  /**
   * Получение селекта суммы цены елементов в корзине
   */
  getSelectTotalPriceOfBasket() {
    return this.store$.select(selectBasketAll).pipe(
      map(products => {
        let prices = products.map(product => product.price * product.count);
        let result = prices.length > 0 ? prices.reduce((acc, count) => acc + count) : 0;
        return result;
      })
    );
  }

  /**
   * Получение селекта статуса открытия корзины
   */
  getSelectBasketStatus() {
    return this.store$.select(selectBasketStatus);
  }

  /**
   * Получение селекта пустой корзины
   */
  getSelectEmptyBasket() {
    return this.getSelectCountBasket().pipe(map(x => x === 0));
  }

  /**
   * Получение селекта количества товара корзины
   */
   getSelectBasketList() {
    return this.store$.select(selectBasketAll);
  }
}

