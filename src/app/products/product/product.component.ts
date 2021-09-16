import { Component, Input, OnInit } from '@angular/core';
import { MainService } from 'src/app/shared/main.service';
import { IProduct, TProductSize } from './product';
import { ActionsProductsService } from '../store/products.actions';
import { ActionsBasketService } from 'src/app/basket/store/basket.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [
    ActionsProductsService,
    ActionsBasketService
  ]
})
export class ProductComponent implements OnInit {

  @Input() product?: IProduct;

  /** Список размеров товара */
  public get sizes(): Array<TProductSize> {
    return this.product?.sizes;
  }

  /** Название товара */
  public get name(): string {
    return this.product?.name ?? '';
  }

  /** Размер товара */
  public get size(): TProductSize  {
    return this.product?.size;
  }
  /** Размер товара */
  public set size(v: TProductSize)  {
    // обновляю товар, меняю размер, и задаю цену в соответствии с размером
    this.actionsProductsService.updateProduct({
      id: this.product.id,
      changes: {
        size: v,
        price: this.product && this.product.prices && Object.prototype.hasOwnProperty.call(this.product.prices, v as string) ? this.product.prices[v] : 0
      }
    });
  }

  /** Изображение товара */
  public get image(): string {
    return this.mainService.getImage(this.product?.image as string);
  }

  /** Цена товара */
  public get price(): number {
    return this.product?.price;
  }

  constructor(private mainService: MainService, private actionsBasketService: ActionsBasketService, private actionsProductsService: ActionsProductsService) { }

  ngOnInit(): void {
  }

  /**
   * Добавляют товар в корзину и открываю ее
   */
  buy(): void {
    this.addToBasket();
    this.actionsBasketService.openBasket();
  }

  /**
   * Просто добавлюя товар в корзину
   */
  addToBasket(): void {
    this.actionsBasketService.addToBasket(this.product);
  }

}
