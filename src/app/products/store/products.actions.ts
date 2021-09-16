import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';
import { createAction, props, Store } from '@ngrx/store';
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

export const updateProduct = createAction(
  '[Products] Update product',
  props<{update: Update<IProduct>}>()
);

@Injectable()
export class ActionsProductsService {

  constructor(private store$: Store) {}

  /**
   * Обновление продукта
   * @param update Обновления
   */
  updateProduct(update: Update<IProduct>) {
    this.store$.dispatch(updateProduct({ update }));
  }

  /**
   * Загрузка товаров
   */
  loadProducts() {
    this.store$.dispatch(loadProducts())
  }

}
