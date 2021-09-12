import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToBasket } from 'src/app/basket/store/basket.actions';
import { MainService } from 'src/app/shared/main.service';
import { IProduct, Product, TProductSize } from './product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product?: Product;

  public sizes: Array<TProductSize> = ['50x50', '100x100', '80x100'];

  public get name(): string {
    return this.product?.name ?? '';
  }

  public get size(): TProductSize  {
    return this.product?.size ?? '100x100';
  }
  public set size(v: TProductSize)  {
    this.product?.size && (this.product.size = v);
  }

  public get image(): string {
    return this.mainService.getImage(this.product?.image as string);
  }

  public get price(): number {
    return this.product && this.product.price && this.product.size && Object.prototype.hasOwnProperty.call(this.product.price, this.product.size as string) ? this.product.price[this.product.size] : 0;
  }

  constructor(private mainService: MainService, private store$: Store) { }

  ngOnInit(): void {
  }

  buy(): void {
    this.store$.dispatch(addToBasket({product: {...this.product as IProduct}}));
  }

  addToBasket(): void {
    this.store$.dispatch(addToBasket({product: {...this.product as IProduct}}));
  }
}
