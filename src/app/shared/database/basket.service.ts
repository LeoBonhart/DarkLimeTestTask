import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserData } from 'src/app/basket/buy-dialog/buy-dialog.component';
import { IBasket } from 'src/app/basket/store/basket.reducer';

export interface IRequestBuyProducts {
  user: IUserData;
  products: Array<IBasket>;
}

export type IResponseBuyProducts = ISuccessBuyProducts | IErrorBuyProducts;

export interface ISuccessBuyProducts{
  success: true;
}

export interface IErrorBuyProducts{
  success: false;
}
@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor() { }

  /**
   * Типа запрос к БД
   * @param data Список товаров
   */
  buyProducts(data: IRequestBuyProducts) {
    return new Observable<IResponseBuyProducts>((subscriber) => {
      console.log('REQUEST_BUY_PRODUCTS', data);
      setTimeout(() => {
        if (data.products.length > 0 && data.user.phone !== '') {
          subscriber.next({success: true});
        }
        if (data.products.length === 0 || data.user.phone === '') {
          subscriber.next({success: false});
        }
      }, 1000);
      return subscriber;
    })
  }
}
