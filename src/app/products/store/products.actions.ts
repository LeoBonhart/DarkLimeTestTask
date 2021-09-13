import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { IProduct } from '../product/product';

export const loadProducts = createAction(
  '[Products] Load Products'
);

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Array<IProduct> }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: any }>()
);

export const updateroduct = createAction(
  '[Products] Update product',
  props<{update: Update<IProduct>}>()
);


