import { HttpClient } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Food } from 'src/app/model/food.model';
import { ProductService } from 'src/app/serice/product.service';
import { AppdataService } from 'src/app/service/appdata.service';
import { LocalService } from 'src/app/service/local.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent{

  foodOj: Food;
  name = `Angular ${VERSION.major}`;
  amount = 0;
  sumprice = 0;
  session: any;

  productList!: any[];
  products: any[] = [];
  subTotal!: any;
  constructor(private data: AppdataService,
    private dialogRef: MatDialogRef<AmountComponent>,
    private http: HttpClient,
    private local: LocalService,
    private product_service: ProductService,
    private router: Router) {
    this.foodOj = data.FoodServic;
    this.product_service.loadCart();
    this.products = this.product_service.getProduct();
  }

  close() {
    this.dialogRef.close();
  }
  // confirm(Food: Object) {
  //   let jsonString = JSON.stringify(Food);
  //   this.local.saveData("SESSION", jsonString)
  //   this.dialogRef.close();
  // }

  addToCart(food: any) {
    if (!this.product_service.productInCart(food)) {
      food.quantity = 1;
      this.product_service.addToCart(food);
      this.products = [...this.product_service.getProduct()];
      this.subTotal = food.price;
    }
    this.dialogRef.close();
  }
}
