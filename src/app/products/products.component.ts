import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as productsSelectors from './store/products.selectors';
import * as productsActions from './store/products.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  dataLoading$ = this.store$.select(productsSelectors.productsLoading);

  products$ = this.store$.select(productsSelectors.selectProductsAll);

  constructor(private store$: Store) { }

  ngOnInit(): void {
    this.store$.dispatch(productsActions.loadProducts());
  }
}
