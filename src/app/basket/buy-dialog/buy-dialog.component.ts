import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SelectsBasketService } from '../store/basket.selectors';

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
  styleUrls: ['./buy-dialog.component.scss'],
  providers: [
    SelectsBasketService
  ]
})
export class BuyDialogComponent implements OnInit {

  /** количество товаров в корзине */
  countBasket$ = this.selectsBasketService.getSelectCountBasket();

  /** сумма товаров в корзине */
  totalPriceBasket$ = this.selectsBasketService.getSelectTotalPriceOfBasket();

  myForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<BuyDialogComponent>, private formBuilder: FormBuilder, private selectsBasketService: SelectsBasketService) { }

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
