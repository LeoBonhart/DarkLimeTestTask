import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './products.reducer';

const productsFeatureSelector = createFeatureSelector<reducer.State>(reducer.productsFeatureKey);

// export const productsLoading = createSelector(productsFeatureSelector, (state) => state.dataLoading);
