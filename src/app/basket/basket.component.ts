import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mapTo, reduce, tap } from 'rxjs/operators';
import { MainService } from '../shared/main.service';
import * as basketSelectors from './store/basket.selectors';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  count$: Observable<number> = this.mainService.getSelectCountBasket();

  constructor(private store$: Store, private mainService: MainService) { }

  ngOnInit(): void {
  }

}
