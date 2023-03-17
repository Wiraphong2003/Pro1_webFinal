import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Food } from 'src/app/model/food.model';
import { Localorder } from 'src/app/model/localorder.model';
import { ProductService } from 'src/app/serice/product.service';
import { AppdataService } from 'src/app/service/appdata.service';
import { LocalService } from 'src/app/service/local.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {

  amounts!: Localorder;
  items = [""];
  counts = 0;
  amount = 0;
  productList!: any[];
  products: any[] = [];
  subTotal!: any;
  constructor(private dataServec: AppdataService,
    private route: Router,
    private http: HttpClient,
    private local: ProductService,
    private router: Router) {
    this.local.loadCart();
    this.products = this.local.getProduct();
    this.local.setCount();

  }
  removeFromCart(product: any) {
    this.local.setCount();
    this.local.removeProduct(product);
    this.products = this.local.getProduct();
  }
  get total() {
    this.local.setCount();
    return this.products?.reduce(
      (sum, product) => ({
        amount: 1,
        price: sum.price + this.amount * product.price,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }
  addAmount() {
    this.amount++;
  }
  removeAmont() {

    if (this.amount > 0) {
      this.amount--;
    }
  }
  backmain() {
    this.router.navigateByUrl("main");
  }

}
