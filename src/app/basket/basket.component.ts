import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav/drawer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mapTo, mergeMap, reduce, skipWhile, switchMap, takeWhile, tap } from 'rxjs/operators';
import { MainService } from '../shared/main.service';
import * as basketSelectors from './store/basket.selectors';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, AfterViewInit {

  @ViewChild('drawer', {static: false}) private matDrawer: MatDrawer|undefined;

  count$: Observable<number> = this.mainService.getSelectCountBasket();

  statusBasket$ = this.mainService.getSelectBasketStatus();

  constructor(private store$: Store, private mainService: MainService) { }

  ngAfterViewInit(): void {
    this.statusBasket$.pipe(
      tap(status => status ? this.matDrawer.open() : this.matDrawer.close()),
      switchMap((status) => {
        return this.matDrawer.openedChange.pipe(skipWhile(x => x === status))
      })
    ).subscribe(status => this.mainService.openCloseBasket(status))
  }

  ngOnInit(): void {
  }


}
