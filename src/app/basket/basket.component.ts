import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav/drawer';
import { skipWhile, switchMap, tap } from 'rxjs/operators';
import { SelectsBasketService } from './store/basket.selectors';
import { ActionsBasketService } from './store/basket.actions';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  providers: [
    ActionsBasketService,
    SelectsBasketService
  ]
})
export class BasketComponent implements OnInit, AfterViewInit {

  /** получаю компонент sidenav */
  @ViewChild('drawer', {static: false}) private matDrawer: MatDrawer|undefined;

  /** количество товаров в корзине */
  countBasket$ = this.selectsBasketService.getSelectCountBasket();

  /** статус пустой корзины */
  emptyBasket$ = this.selectsBasketService.getSelectEmptyBasket();

  /** список товаров в корзине */
  basketList$ = this.selectsBasketService.getSelectBasketList();

  /** статус открытия корзины */
  statusBasket$ = this.selectsBasketService.getSelectBasketStatus();

  constructor(private selectsBasketService: SelectsBasketService, private actionsBasketSevice: ActionsBasketService) { }

  ngAfterViewInit(): void {
    this.statusBasket$.pipe(
      tap(status => status ? this.matDrawer.open() : this.matDrawer.close()), // открываю или закрываю корзину в соответствии со статусом
      switchMap((status) => { // переопределяю поток на состояние компонента sidenav и пропускаю события если статус одинаковый (чтобы не вызывались одинаковые события store)
        return this.matDrawer.openedChange.pipe(skipWhile(x => x === status))
      })
    ).subscribe(status => this.actionsBasketSevice.openCloseBasket(status))
  }

  ngOnInit(): void {
  }

  /**
   * Покупка товаров
   */
  buy() {
    this.actionsBasketSevice.buyBasket();
  }

  /**
   * Очистить корзину
   */
  clear() {
    this.actionsBasketSevice.clearBasket();
    this.actionsBasketSevice.closeBasket();
  }
}
