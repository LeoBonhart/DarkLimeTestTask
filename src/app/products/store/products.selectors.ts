import { Injectable } from '@angular/core';
import { ActionReducerMap, createFeatureSelector, createSelector, Store } from '@ngrx/store';
import * as reducer from './products.reducer';

export interface State {
  products: reducer.State;
}

export const reducers: ActionReducerMap<State> = {
  products: reducer.reducer,
};

export const selectProductsFeatureState = createFeatureSelector<reducer.State>(reducer.productsFeatureKey);

export const selectProductsTotal = createSelector(selectProductsFeatureState, reducer.selectProductsTotal);

export const selectProductsEntities = createSelector(selectProductsFeatureState, reducer.selectProductsEntities);

export const selectProductsAll = createSelector(selectProductsFeatureState, reducer.selectAllProducts);

export const selectProductsIds = createSelector(selectProductsFeatureState, reducer.selectProductsIds);

export const productsLoading = createSelector(selectProductsFeatureState, (state): boolean => state.dataLoading);

@Injectable()
export class SelectsProductsService {

  constructor(private store$: Store){}

  productsLoading() {
    return this.store$.select(productsLoading)
  }

  selectProductsAll() {
    return this.store$.select(selectProductsAll)
  }

}
