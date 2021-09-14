import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav/drawer';
import { Store } from '@ngrx/store';
import { map, skipWhile, switchMap, tap } from 'rxjs/operators';
import { MainService } from '../shared/main.service';
import * as basketSelectors from './store/basket.selectors';
import * as basketActions from './store/basket.actions';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, AfterViewInit {

  /** получаю компонент sidenav */
  @ViewChild('drawer', {static: false}) private matDrawer: MatDrawer|undefined;

  /** количество товаров в корзине */
  count$ = this.mainService.getSelectCountBasket();

  /** статус пустой корзины */
  empty$ = this.count$.pipe(map(x => x === 0));

  /** сумма товаров в корзине */
  totalPrice$ = this.mainService.getSelectTotalPriceOfBasket();

  /** список товаров в корзине */
  basketList$ = this.store$.select(basketSelectors.selectBasketAll);

  /** статус открытия корзины */
  statusBasket$ = this.mainService.getSelectBasketStatus();

  constructor(private store$: Store, private mainService: MainService) { }

  ngAfterViewInit(): void {
    this.statusBasket$.pipe(
      tap(status => status ? this.matDrawer.open() : this.matDrawer.close()), // открываю или закрываю корзину в соответствии со статусом
      switchMap((status) => { // переопределяю поток на состояние компонента sidenav и пропускаю события если статус одинаковый (чтобы не вызывались одинаковые события store)
        return this.matDrawer.openedChange.pipe(skipWhile(x => x === status))
      })
    ).subscribe(status => this.mainService.openCloseBasket(status))
  }

  ngOnInit(): void {
  }

  /**
   * Покупка товаров
   */
  buy() {
    this.store$.dispatch(basketActions.buyBasket());
  }

  /**
   * Очистить корзину
   */
  clear() {
    this.store$.dispatch(basketActions.clearBasket());
    this.mainService.closeBasket();
  }
}
