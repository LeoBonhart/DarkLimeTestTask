import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, skipWhile, switchMap, tap } from 'rxjs/operators';
import { IProduct, TProductSize } from '../product/product';
import * as productsSelectors from '../store/products.selectors';
import * as productsActions from '../store/products.actions';
import { addToBasket } from 'src/app/basket/store/basket.actions';
import { MainService } from 'src/app/shared/main.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  /** Список размеров товара */
  public get sizes(): Array<TProductSize> {
    return this.product.sizes;
  }

  /** Название товара */
  public get name(): string {
    return this.product.name ?? '';
  }

  /** Описание товара */
  public get description(): string {
    return this.product.description ?? '';
  }

  /** Размер товара */
  public get size(): TProductSize  {
    return this.product.size ?? '100x100';
  }
  /** Размер товара */
  public set size(v: TProductSize)  {
    this.store$.dispatch(productsActions.updateroduct({
      update: {id: this.product.id, changes: {
        size: v,
        price: this.price
      }}
    }));
  }

  /** Изображение товара */
  public get image(): string {
    return this.mainService.getImage(this.product?.image as string);
  }

  /** Цена товара */
  public get price(): number {
    // Получаю цену в соответствии размера
    return this.product && this.product.prices && this.product.size && Object.prototype.hasOwnProperty.call(this.product.prices, this.product.size as string) ? this.product.prices[this.product.size] : 0;
  }

  /** признак загрузки данных */
  dataLoading$ = this.store$.select(productsSelectors.productsLoading);

  /** список товаров */
  dataListProducts$ = this.store$.select(productsSelectors.selectProductsAll);

  /** товар */
  product: IProduct;

  /** Подпись на получение товара по id */
  subscription$: Subscription;

  constructor(private activateRoute: ActivatedRoute, private store$: Store, private router: Router, private mainService: MainService) { }

  ngOnInit(): void {
    this.subscription$ = this.activateRoute.params.pipe(
      switchMap(params => {
        return this.dataListProducts$.pipe(
          tap(x => (x.length === 0 && this.store$.dispatch(productsActions.loadProducts()))), // если еще нет продуктов
          skipWhile(x => x.length === 0), // жду пока они загрузяться
          map(products => products.filter(x => x.id === params['id'])[0]) // получаю продукт по id
        );
      }),
      tap((x) => ( x === undefined && this.router.navigate(['']))) // если такого id нет, то делаю переадресацию на главную
    ).subscribe(product => this.product = product);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  /**
   * Добавляю товар в корзину и открываю ее
   */
  buy(): void {
    this.addToBasket();
    this.mainService.openBasket();
  }

  /**
   * Просто добавляю товар в корзину
   */
  addToBasket(): void {
    this.store$.dispatch(addToBasket({product: {...this.product as IProduct}}));
  }

}
