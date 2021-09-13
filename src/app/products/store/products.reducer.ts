import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IProduct } from '../product/product';
import * as actions from './products.actions';


export const productsFeatureKey = 'Products';

export interface State extends EntityState<IProduct> {
  dataLoading: boolean;
}

export const productsAdapter = createEntityAdapter<IProduct>();


export const initialState: State = productsAdapter.getInitialState({
  dataLoading: false
});

const productsReducer = createReducer(
  initialState,
  on(actions.loadProducts, (state) =>{
    let dataLoading: boolean = true;
    if (state.ids.length > 0) {
      dataLoading = false;
    }
    return {...state, dataLoading};
  }),
  on(actions.loadProductsSuccess, (state, {products}) => {
    return {...productsAdapter.addMany(products, state), dataLoading: false};
  }),
  on(actions.updateroduct, (state, {update}) => {
    return productsAdapter.updateOne(update, state);
  }),
  on(actions.loadProductsFailure, (state) => ({
    ...state,
    dataLoading: false
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return productsReducer(state, action);
}

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = productsAdapter.getSelectors();

export const selectProductsIds = selectIds;

export const selectProductsEntities = selectEntities;

export const selectAllProducts = selectAll;

export const selectProductsTotal = selectTotal;
