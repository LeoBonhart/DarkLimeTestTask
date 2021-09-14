import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { MainService } from './shared/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /** количество товаров в корзине */
  count$ = this.mainService.getSelectCountBasket();

  /** статус пустой корзины */
  empty$ = this.count$.pipe(map(x => x === 0));

  /** сумма товаров в корзине */
  totalPrice$ = this.mainService.getSelectTotalPriceOfBasket();

  /** статус открытия корзины */
  statusBasket$ = this.mainService.getSelectBasketStatus();

  constructor(private mainService: MainService) {}

  /**
   * Открытие/закрытие корзины
   */
  openBasket() {
    this.mainService.toggleBasket();
  }
}
