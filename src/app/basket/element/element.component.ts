import { Component, Input, OnInit } from '@angular/core';
import { TProductSize } from 'src/app/products/product/product';
import { IBasket } from '../store/basket.reducer';
import { ActionsBasketService } from '../store/basket.actions';
import { MainService } from 'src/app/shared/main.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
  providers: [
    ActionsBasketService
  ]
})
export class ElementComponent implements OnInit {

  @Input() element: IBasket;


  /** Название товара */
  public get name(): string {
    return this.element.name ?? '';
  }

  /** Размер товара */
  public get size(): TProductSize  {
    return this.element.size;
  }

  /** Количесто товара */
  public get count(): number {
    return this.element.count ?? 0;
  }

  /** Количество товара */
  public set count(v: number)  {
    // если меняется количестов, вызываю событие на изменение товара корзины, и меняю количество
    this.actionsBasketService.updateBasket({
      id: this.element.id,
      changes: {
        count: v
      }
    });
  }

  /** Изображение товара */
  public get image(): string {
    return this.mainService.getImage(this.element?.image as string);
  }

  /** Цена товара с учетом количества */
  public get price(): number {
    return this.element.price * this.element.count;
  }

  constructor(private actionsBasketService: ActionsBasketService, private mainService: MainService) { }

  ngOnInit(): void {
  }

  /**
   * Увеличение количества товара
   */
  increase() {
    this.count = this.count + 1;
  }

  /**
   * Уменьшение количества товара
   */
  decrease() {
    this.count = this.count - 1;
  }

  /**
   * Удаление продукта из корзины
   */
  deleteProduct() {
    this.actionsBasketService.removeFromBasket(this.element.id);
  }
}
