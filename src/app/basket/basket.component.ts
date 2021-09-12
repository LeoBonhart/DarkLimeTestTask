import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mapTo, reduce, tap } from 'rxjs/operators';
import * as basketSelectors from './store/basket.selectors';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  count$: Observable<number> = this.store$.select(basketSelectors.selectBasketAll).pipe(
    map(products => products.map(product => product.count ?? 0).reduce((acc, count) => acc + count))
  );

  constructor(private store$: Store) { }

  ngOnInit(): void {
  }

}
