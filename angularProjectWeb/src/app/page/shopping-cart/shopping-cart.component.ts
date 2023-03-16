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

  amount = 0
  productList!: any[];
  products: any[] = [];
  subTotal!: any;
  constructor(private dataServec: AppdataService,
    private route: Router,
    private http: HttpClient,
    private local: LocalService,
    private product_service: ProductService) {

    this.items = local.items;
    // console.log(JSON.parse(this.items));
    this.product_service.loadCart();
    this.products = this.product_service.getProduct();
  
  }
  removeFromCart(product: any) {
    this.product_service.removeProduct(product);
    this.products = this.product_service.getProduct();
  }
  get total() {
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

}
