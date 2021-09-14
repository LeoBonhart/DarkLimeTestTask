import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { map, switchMap, tap} from 'rxjs/operators';
import { BasketService, IResponseBuyProducts } from 'src/app/shared/database/basket.service';
import { MainService } from 'src/app/shared/main.service';
import { BuyDialogService } from '../buy-dialog/buy-dialog.service';
import * as actions from './basket.actions';
import { selectBasketStatus, selectLastBasketId, selectBasketAll } from './basket.selectors';


@Injectable()
export class BasketEffects {

  updateDate$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addToBasket, actions.clearBasket, actions.removeFromBasket, actions.updateBasket),
    map(() => actions.updateDate({date: Date.now()})) // обновляю дату изменения корзины
  ));

  addToBasket$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addToBasket),
    concatLatestFrom(action => this.store$.select(selectLastBasketId)), // получаю id последнего добавленного элемента в корзину
    map(([,id]) => actions.increaseProductInBasket({id})) // вызываю событие увеличения количества товара
  ));

  toggleBasket$ = createEffect(() => this.actions$.pipe(
    ofType(actions.toggleBasket),
    concatLatestFrom(action => this.store$.select(selectBasketStatus)), // получаю статус корзина
    map(([,status]) => status ? actions.closeBasket() : actions.openBasket()) // вызываю событие в зависимости от статуса корзины
  ));

  buyBasket$ = createEffect(() => this.actions$.pipe(
    ofType(actions.buyBasket),
    concatLatestFrom(action => this.store$.select(selectBasketAll)), // получаю все заказы корзина
    switchMap(([,list]) => // переключаю поток на диалоговое окно подтверждения покупки
      this.dialog.open().pipe(
        switchMap(dialogData => { // перегключаю потока на запрос к БД
          if (dialogData) { // если пользователь подтвердил заказ, делаю запрос
            return this.basketDatabaseService.buyProducts({user: dialogData, products: list})
          } else {
            return EMPTY;
          }
        })
      )
    ),
    tap(response => this.buyInfo(response)), // вывожу информацию пользователю
    map((response) => response.success ?
      actions.successBuyBasket() : actions.errorBuyBasket()) // вызываю событие соотвенное результату запроса
  ));

  closeBasketAfterSuccesBuy$ = createEffect(() => this.actions$.pipe(
    ofType(actions.successBuyBasket),
    map(() => actions.closeBasket())
  ));

  constructor(private actions$: Actions, private store$: Store, private dialog: BuyDialogService, private basketDatabaseService: BasketService, private mainService: MainService) {}

  /**
   * Отображение пользователь о результате покупки
   * @param response Ответ от сервера
   */
  buyInfo(response: IResponseBuyProducts) {
    if (response.success) {
      this.mainService.snackBar({
        text: 'Покупка подтверждена',
        cls: 'success'
      })
    } else {
      this.mainService.snackBar({
        text: 'Ошибка',
        cls: 'error'
      })
    }
  }

}
