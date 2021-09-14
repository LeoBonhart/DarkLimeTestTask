import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BuyDialogComponent, IUserData } from './buy-dialog.component';

@Injectable()
export class BuyDialogService {

  constructor(private dialog: MatDialog) { }

  open( width?: string) {
    const config: MatDialogConfig<any> = {};
    if (width) {
      config.width = width;
    }
    const dialogRef = this.dialog.open<BuyDialogComponent, any, IUserData>(BuyDialogComponent, config);
    return dialogRef.afterClosed();
  }
}
