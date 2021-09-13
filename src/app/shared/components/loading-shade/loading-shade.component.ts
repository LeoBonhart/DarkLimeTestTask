import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-shade',
  templateUrl: './loading-shade.component.html',
  styleUrls: ['./loading-shade.component.scss']
})
export class LoadingShadeComponent implements OnInit {

  @Input() isLoadingResults: boolean;

  @Input() isRateLimitReached: boolean;

  @HostBinding('style.display') get display() {
    return this.isLoadingResults || this.isRateLimitReached ? '' : 'none';
  }

  constructor() { }

  ngOnInit(): void {
  }

}
