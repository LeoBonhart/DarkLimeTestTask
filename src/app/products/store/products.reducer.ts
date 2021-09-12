import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './products.actions';


export const productsFeatureKey = 'Products';

export interface State {
  dataLoading: boolean;
}

export const initialState: State = {
  dataLoading: false
};

export const reducer = createReducer(
  initialState,
  on(actions.loadProducts, (state) => ({
    ...state,
    dataLoading: true
  })),
  on(actions.loadProductsSuccess, (state) => ({
    ...state,
    dataLoading: false
  })),
  on(actions.loadProductsFailure, (state) => ({
    ...state,
    dataLoading: false
  }))
);

