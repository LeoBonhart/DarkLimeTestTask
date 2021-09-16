import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as basketSelectors from '../basket/store/basket.selectors';
import * as basketActions from '../basket/store/basket.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

type SnackBarType = 'error' | 'success';

/** Данные оповещения */
interface ISnackBar {
  /** Текст оповещения */
  text: string;
  /** Длительность активности */
  duration?: number;
  /** Текст кнопки, по умолчанию Закрыть */
  action?: string;
  /** Цвет оповещения 'error' или 'success' */
  cls?: SnackBarType;
}

@Injectable({
  providedIn: 'root'
})
export class MainService {

  /** путь к папке с изображениями */
  readonly imageSrc: string = 'assets/images/';

  constructor(private _snackBar: MatSnackBar) { }

  /**
   * Вызов snackBar
   * @param data Данные
   */
  snackBar(data: ISnackBar) {
    this._snackBar.open(data.text, data.action ?? 'Закрыть', {
      duration: data.duration ?? 40000,
      panelClass: data.cls ?? ''
    });
  }

  /**
   * Метод получения полного адреса изображения
   * @param name Название изображения с расширением
   */
  getImage(name: string): string {
    return this.imageSrc + name;
  }

}
