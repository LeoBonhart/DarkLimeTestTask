import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
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
