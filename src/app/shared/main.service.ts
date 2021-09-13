import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as basketSelectors from '../basket/store/basket.selectors';
import * as basketActions from '../basket/store/basket.actions';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  readonly imageSrc: string = 'assets/images/';

  constructor(private store$: Store) { }

  getImage(name: string): string {
    return this.imageSrc + name;
  }

  getSelectCountBasket() {
    return this.store$.select(basketSelectors.selectBasketAll).pipe(
      map(products => {
        let counts = products.map(product => product.count ?? 0);
        let result = counts.length > 0 ? counts.reduce((acc, count) => acc + count) : 0;
        return result;
      })
    );
  }

  getSelectTotalPriceOfBasket() {
    return this.store$.select(basketSelectors.selectBasketAll).pipe(
      map(products => {
        let prices = products.map(product => product.price * product.count);
        let result = prices.length > 0 ? prices.reduce((acc, count) => acc + count) : 0;
        return result;
      })
    );
  }

  getSelectBasketStatus() {
    return this.store$.select(basketSelectors.selectBasketStatus);
  }

  openCloseBasket(status: boolean) {
    status ? this.openBasket() : this.closeBasket();
  }

  openBasket() {
    this.store$.dispatch(basketActions.openBasket());
  }

  closeBasket() {
    this.store$.dispatch(basketActions.closeBasket());
  }

  toggleBasket() {
    this.store$.dispatch(basketActions.toggleBasket());
  }

}
