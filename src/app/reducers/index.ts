import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as basket from '../basket/store/basket.reducer';
import * as products from '../products/store/products.reducer';

export interface State {
  [basket.basketFeatureKey]: basket.State;
  [products.productsFeatureKey]: products.State;
}

export const reducers: ActionReducerMap<State> = {
  [basket.basketFeatureKey]: basket.reducer,
  [products.productsFeatureKey]: products.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
