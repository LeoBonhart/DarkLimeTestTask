import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as basketSelectors from '../basket/store/basket.selectors';
import * as basketActions from '../basket/store/basket.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

type SnackBarType = 'error' | 'success';

/** Данные оповещения */
interface ISnackBar {
  /** Текст оповещения */
  text: string;
  /** Длительность активности */
  duration?: number;
  /** Текст кнопки, по умолчанию Закрыть */
  action?: string;
  /** Цвет оповещения 'error' или 'success' */
  cls?: SnackBarType;
}

@Injectable({
  providedIn: 'root'
})
export class MainService {

  /** путь к папке с изображениями */
  readonly imageSrc: string = 'assets/images/';

  constructor(private store$: Store, private _snackBar: MatSnackBar) { }

  /**
   * Вызов snackBar
   * @param data Данные
   */
  snackBar(data: ISnackBar) {
    this._snackBar.open(data.text, data.action ?? 'Закрыть', {
      duration: data.duration ?? 40000,
      panelClass: data.cls ?? ''
    });
  }

  /**
   * Метод получения полного адреса изображения
   * @param name Название изображения с расширением
   */
  getImage(name: string): string {
    return this.imageSrc + name;
  }

  /**
   * Получение селекта количества елементов в корзине
   */
  getSelectCountBasket() {
    return this.store$.select(basketSelectors.selectBasketAll).pipe(
      map(products => {
        let counts = products.map(product => product.count ?? 0);
        let result = counts.length > 0 ? counts.reduce((acc, count) => acc + count) : 0;
        return result;
      })
    );
  }

  /**
   * Получение селекта суммы цены елементов в корзине
   */
  getSelectTotalPriceOfBasket() {
    return this.store$.select(basketSelectors.selectBasketAll).pipe(
      map(products => {
        let prices = products.map(product => product.price * product.count);
        let result = prices.length > 0 ? prices.reduce((acc, count) => acc + count) : 0;
        return result;
      })
    );
  }

  /**
   * Получение селекта статуса открытия корзины
   */
  getSelectBasketStatus() {
    return this.store$.select(basketSelectors.selectBasketStatus);
  }

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
    this.store$.dispatch(basketActions.openBasket());
  }

  /**
   * Закрыть корзину
   */
  closeBasket() {
    this.store$.dispatch(basketActions.closeBasket());
  }

  /**
   * Переклчение состояние открытия корзины
   */
  toggleBasket() {
    this.store$.dispatch(basketActions.toggleBasket());
  }

}
