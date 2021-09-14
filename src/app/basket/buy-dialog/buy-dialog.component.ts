import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MainService } from 'src/app/shared/main.service';

interface IControls{
  username: Array<any>;
  phone: Array<any>;
}

export interface IUserData{
  username: string;
  phone: string;
}

@Component({
  selector: 'app-buy-dialgo',
  templateUrl: './buy-dialog.component.html',
  styleUrls: ['./buy-dialog.component.scss']
})
export class BuyDialogComponent implements OnInit {

  /** количество товаров в корзине */
  count$ = this.mainService.getSelectCountBasket();

  /** сумма товаров в корзине */
  totalPrice$ = this.mainService.getSelectTotalPriceOfBasket();

  myForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<BuyDialogComponent>, private formBuilder: FormBuilder, private mainService: MainService) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group(<IControls>{
      username: ['', [ Validators.required]],
      phone: ['', [ Validators.required]]
    });
  }

  submit() {
    if (this.myForm.valid) {
      const data: IUserData = {
        username: this.myForm.value.username,
        phone: this.myForm.value.phone
      };
      this.dialogRef.close(data);
    } else {
      Object.keys(this.myForm.controls).forEach(field => {
        const control = this.myForm.get(field);
        control.markAsTouched()
      });
    }
  }

  errorPredicate<K extends keyof IControls>(control: K, error: string): boolean {
    const _control = this.myForm.controls[control];
    return _control.hasError(error) && _control.touched;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
