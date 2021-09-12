import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ProductsSelectors from './store/products.selectors';
import * as BasketActions from '../basket/store/basket.actions';
import { Product } from './product/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  // dataLoading$: Observable<boolean> = this.store$.select(ProductsSelectors.productsLoading);

  products: Array<Product> = [
    new Product({
      id: '1',
      image: '1_29af4f66-60ec-4788-8187-75fd4840ebdb_360x.jpg',
      name: 'Картина Jordan 1',
      size: '100x100',
      price: {
        '50x50': 1000,
        '100x100': 2000,
        '80x100': 1500
      },
      description: 'Опсиание картины'
    }),
    new Product({
      id: '2',
      image: '3_6858511f-d021-4f58-b4eb-7b85bf2109f6_360x.jpg',
      name: 'Картина Версачи',
      size: '100x100',
      price: {
        '50x50': 1000,
        '100x100': 2000,
        '80x100': 1500
      },
      description: 'Опсиание картины'
    }),
    new Product({
      id: '3',
      image: '4_b8430089-62b7-4282-97e2-483d27ed7812_360x.jpg',
      name: 'Картина Nike пара',
      size: '100x100',
      price: {
        '50x50': 1000,
        '100x100': 2000,
        '80x100': 1500
      },
      description: 'Опсиание картины'
    }),
    new Product({
      id: '4',
      image: '7fixedC_360x.jpg',
      name: 'Картина Татуировки',
      size: '100x100',
      price: {
        '50x50': 1000,
        '100x100': 2000,
        '80x100': 1500
      },
      description: 'Опсиание картины'
    }),
    new Product({
      id: '5',
      image: 'Mockup12_e0530162-4906-4c03-8869-ed6f0597c301_360x.jpg',
      name: 'Картина Nike Jordan 1',
      size: '100x100',
      price: {
        '50x50': 1000,
        '100x100': 2000,
        '80x100': 1500
      },
      description: 'Опсиание картины'
    }),
    new Product({
      id: '6',
      image: 'product-image-1035838692_360x.jpg',
      name: 'Картина графити',
      size: '100x100',
      price: {
        '50x50': 1000,
        '100x100': 2000,
        '80x100': 1500
      },
      description: 'Опсиание картины'
    }),
    new Product({
      id: '7',
      image: 'product-image-1070385846_360x.jpg',
      name: 'Картина шимпанзе',
      size: '100x100',
      price: {
        '50x50': 1000,
        '100x100': 2000,
        '80x100': 1500
      },
      description: 'Опсиание картины'
    }),
    new Product({
      id: '8',
      image: 'product-image-1389742773_360x.jpg',
      name: 'Картина губы',
      size: '100x100',
      price: {
        '50x50': 1000,
        '100x100': 2000,
        '80x100': 1500
      },
      description: 'Опсиание картины'
    }),
    new Product({
      id: '9',
      image: 'product-image-1478417494_360x.jpg',
      name: 'Картина занавес',
      size: '100x100',
      price: {
        '50x50': 1000,
        '100x100': 2000,
        '80x100': 1500
      },
      description: 'Опсиание картины'
    }),
    new Product({
      id: '10',
      image: 'product-image-1564773296_360x.jpg',
      name: 'Картина крестики нолики',
      size: '100x100',
      price: {
        '50x50': 1000,
        '100x100': 2000,
        '80x100': 1500
      },
      description: 'Опсиание картины'
    }),
    new Product({
      id: '11',
      image: 'product-image-1590683444_360x.jpg',
      name: 'Картина любовь',
      size: '100x100',
      price: {
        '50x50': 1000,
        '100x100': 2000,
        '80x100': 1500
      },
      description: 'Опсиание картины'
    }),
    new Product({
      id: '12',
      image: 'product-image-1600377221_360x.jpg',
      name: 'Картина любовь 2',
      size: '100x100',
      price: {
        '50x50': 1000,
        '100x100': 2000,
        '80x100': 1500
      },
      description: 'Опсиание картины'
    }),
    new Product({
      id: '13',
      image: 'product-image-1600380510_360x.jpg',
      name: 'Картина любовь 3',
      size: '100x100',
      price: {
        '50x50': 1000,
        '100x100': 2000,
        '80x100': 1500
      },
      description: 'Опсиание картины'
    }),
    new Product({
      id: '14',
      image: 'product-image-1532653935_360x.jpg',
      name: 'Картина занавес 2',
      size: '100x100',
      price: {
        '50x50': 1000,
        '100x100': 2000,
        '80x100': 1500
      },
      description: 'Опсиание картины'
    }),
  ]

  constructor(private store$: Store) { }

  ngOnInit(): void {
  }

  // add() {
  //   this.store$.dispatch(BasketActions.addToBasket());
  // }

  // remove() {
  //   this.store$.dispatch(BasketActions.removeFromBasket());
  // }

}
