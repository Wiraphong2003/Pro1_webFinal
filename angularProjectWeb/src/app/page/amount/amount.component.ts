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
  constructor(private dataService: AppdataService,
    private dialogRef: MatDialogRef<AmountComponent>,
    private http: HttpClient,
    private local: ProductService,
    private localUser: LocalService,
    private router: Router) {
    this.foodOj = dataService.FoodServic;
    this.local.loadCart();
    this.products = this.local.getProduct();

  }

  close() {
    this.dialogRef.close();
  }

  addToCart(food: any) {
    let insert = {
      uid: this.localUser.getData("USER"),
      food_id: food,
    }
    this.http.post(this.dataService.apiEndpoint + '/insertcart',
      (JSON.stringify(insert))).subscribe((cart: any) => {
        console.log(cart);
      });
    this.dialogRef.close();
  }
}
