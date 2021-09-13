import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { MainService } from './shared/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  count$ = this.mainService.getSelectCountBasket();

  empty$ = this.count$.pipe(map(x => x === 0));

  totalPrice$ = this.mainService.getSelectTotalPriceOfBasket();

  statusBasket$ = this.mainService.getSelectBasketStatus();

  constructor(private mainService: MainService) {}

  openBasket() {
    this.mainService.toggleBasket();
  }
}
