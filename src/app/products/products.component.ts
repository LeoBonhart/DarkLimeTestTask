import { Component, OnInit } from '@angular/core';
import { SelectsProductsService } from './store/products.selectors';
import { ActionsProductsService } from './store/products.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [
    ActionsProductsService,
    SelectsProductsService
  ]
})
export class ProductsComponent implements OnInit {

  /** признак загрузки данных */
  dataLoadingProducts$ = this.selectsProductsService.productsLoading();

  /** список товаров */
  products$ = this.selectsProductsService.selectProductsAll();

  constructor(private selectsProductsService: SelectsProductsService, private actionsProductsService: ActionsProductsService) { }

  ngOnInit(): void {
    this.actionsProductsService.loadProducts();
  }
}
