import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';
import { createAction, props, Store } from '@ngrx/store';
import { IProduct } from 'src/app/products/product/product';
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

export const openBasket = createAction(
  '[Basket] Open basket'
);

export const closeBasket = createAction(
  '[Basket] Close basket'
);

export const toggleBasket = createAction(
  '[Basket] Toggle basket'
);

export const buyBasket = createAction(
  '[Basket] Buy products from basket'
);

export const successBuyBasket = createAction(
  '[Basket] Success buy basket'
);

export const errorBuyBasket = createAction(
  '[Basket] Error buy basket'
);
@Injectable()
export class ActionsBasketService {

  constructor(private store$: Store) {}

  /**
   * Открытие закрыти корзины
   * @param status Статус true открыть, false закрыть
   */
   openCloseBasket(status: boolean) {
    status ? this.openBasket() : this.closeBasket();
  }

  /**
   * Открыть коризину
   */
  openBasket() {
    this.store$.dispatch(openBasket());
  }

  /**
   * Закрыть корзину
   */
  closeBasket() {
    this.store$.dispatch(closeBasket());
  }

  /**
   * Переклчение состояние открытия корзины
   */
  toggleBasket() {
    this.store$.dispatch(toggleBasket());
  }

  /**
   * Очистка корзины
   */
  clearBasket() {
    this.store$.dispatch(clearBasket());
  }

  /**
   * Покупка товаров
   */
  buyBasket() {
    this.store$.dispatch(buyBasket());
  }

  /**
   * Добавлюя товар в корзину
   * @param product товар
   */
  addToBasket(product: IProduct) {
    this.store$.dispatch(addToBasket({product: {...product}}));
  }

  /**
   * Обновление товара в корзине
   * @param update товар
   */
   updateBasket(update: Update<IBasket>) {
     this.store$.dispatch(updateBasket({ update }));
  }

  /**
   * Удаление товара из корзины
   * @param id идентификатор товара
   */
  removeFromBasket(id: string) {
    this.store$.dispatch(removeFromBasket({id}));
  }
}
