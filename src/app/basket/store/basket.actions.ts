import { EntityMap, EntityMapOne, Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { IBasket } from './basket.reducer';

export const addToBasket = createAction(
  '[Basket] Add product to the basket',
  props<{product: IBasket}>()
);

export const increaseProductInBasket = createAction(
  '[Basket] Increase product in the basket',
  props<{id: string}>()
);

export const decreaseProductInBasket = createAction(
  '[Basket] Decrease product in the basket',
  props<{id: string}>()
);

export const updateBasket = createAction(
  '[Basket] Update product in the basket',
  props<{update: Update<IBasket>}>()
);

export const removeFromBasket = createAction(
  '[Basket] Remove product from the basket',
  props<{id: string}>()
);

export const clearBasket = createAction(
  '[Basket] Remove all products from the basket'
);

export const updateDate = createAction(
  '[Basket] Date of change product basket',
  props<{date: number}>()
);

