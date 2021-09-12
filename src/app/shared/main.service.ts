import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  readonly imageSrc: string = 'assets/images/';

  constructor() { }

  getImage(name: string): string {
    return this.imageSrc + name;
  }
}
