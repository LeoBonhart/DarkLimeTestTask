import { Component } from '@angular/core';
import { ActionsBasketService } from './basket/store/basket.actions';
import { SelectsBasketService } from './basket/store/basket.selectors';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    ActionsBasketService,
    SelectsBasketService
  ]
})
export class AppComponent {

  /** количество товаров в корзине */
  countBasket$ = this.selectsBasketService.getSelectCountBasket();

  /** статус пустой корзины */
  emptyBasket$ = this.selectsBasketService.getSelectEmptyBasket();

  /** сумма товаров в корзине */
  totalPriceBasket$ = this.selectsBasketService.getSelectTotalPriceOfBasket();

  /** статус открытия корзины */
  statusBasket$ = this.selectsBasketService.getSelectBasketStatus();

  constructor(private selectsBasketService: SelectsBasketService, private actionsBasketService: ActionsBasketService) {}

  /**
   * Открытие/закрытие корзины
   */
  openBasket() {
    this.actionsBasketService.toggleBasket();
  }
}
