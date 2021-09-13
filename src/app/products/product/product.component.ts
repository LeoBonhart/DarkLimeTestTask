import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToBasket } from 'src/app/basket/store/basket.actions';
import { MainService } from 'src/app/shared/main.service';
import { IProduct, Product, TProductSize } from './product';
import * as productsActions from '../store/products.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product?: IProduct;

  public get sizes(): Array<TProductSize> {
    return this.product?.sizes;
  }

  public get name(): string {
    return this.product?.name ?? '';
  }

  public get size(): TProductSize  {
    return this.product?.size;
  }
  public set size(v: TProductSize)  {
    this.store$.dispatch(productsActions.updateroduct({
      update: {id: this.product.id, changes: {
        size: v,
        price: this.product && this.product.prices && Object.prototype.hasOwnProperty.call(this.product.prices, v as string) ? this.product.prices[v] : 0
      }}
    }));
  }

  public get image(): string {
    return this.mainService.getImage(this.product?.image as string);
  }

  public get price(): number {
    return this.product?.price;
  }

  constructor(private mainService: MainService, private store$: Store) { }

  ngOnInit(): void {
  }

  buy(): void {
    this.store$.dispatch(addToBasket({product: {...this.product as IProduct}}));
    this.mainService.openBasket();
  }

  addToBasket(): void {
    this.store$.dispatch(addToBasket({product: {...this.product as IProduct}}));
  }

}
