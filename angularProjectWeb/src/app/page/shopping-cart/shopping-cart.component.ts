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
export class ShoppingCartComponent{

  amounts!: Localorder;

  counts = 0;
  amountALL = 0;
  productList!: any[];
  products: any[] = [];
  subTotal!: any;
  foodcart!: any[];
  constructor(private dataService: AppdataService,
    private route: Router,
    private http: HttpClient,
    private local: ProductService,
    private router: Router,
    private localS: LocalService) {
    this.local.loadCart();
    this.products = this.local.getProduct();
    this.local.setCount();

    this.http.get(this.dataService.apiEndpoint + '/cart/' + localS.getData("USER")).subscribe((data: any) => {
      console.log(data);
      this.foodcart = data
    });

  }
  gettotal(){
    this.foodcart.forEach(element => {
      console.log(element.amount);
      this.amountALL = element.amount*element.price
      // element.amount
    });
  }
  removeFromCart(fid: any) {
    console.log(fid);
    let Jsonamount = {
      uid: this.localS.getData("USER"),
      food_id: fid,
    }
    this.http.post(this.dataService.apiEndpoint + '/deletecart',
      (JSON.stringify(Jsonamount))).subscribe((e: any) => {
        console.log(e);

        this.http.get(this.dataService.apiEndpoint + '/cart/' + this.localS.getData("USER")).subscribe((data: any) => {
          console.log(data);
          this.foodcart = data
          this.gettotal()
        });
    });
  }
  addAmount(fid: any,amount:any) {
    console.log(fid);
    console.log(amount);

    let Jsonamount = {
      uid: this.localS.getData("USER"),
      food_id: fid,
      amount:amount+1
    }
    this.http.post(this.dataService.apiEndpoint + '/updatecart',
      (JSON.stringify(Jsonamount))).subscribe((e: any) => {
        console.log(e);

        this.http.get(this.dataService.apiEndpoint + '/cart/' + this.localS.getData("USER")).subscribe((data: any) => {
          console.log(data);
          this.foodcart = data
          this.gettotal()
        });

      });
  }
  removeAmont(fid:any,amount:any) {
    if(amount>0){
      let Jsonamount = {
      uid: this.localS.getData("USER"),
      food_id: fid,
      amount: amount-1
    }
    this.http.post(this.dataService.apiEndpoint + '/updatecart',
      (JSON.stringify(Jsonamount))).subscribe((e: any) => {
        console.log(e);

        this.http.get(this.dataService.apiEndpoint + '/cart/' + this.localS.getData("USER")).subscribe((data: any) => {
          console.log(data);
          this.foodcart = data
          this.gettotal()
        });
      });
    }
    console.log(fid);
    console.log(amount);
  }

  backmain() {
    this.gettotal()
    this.router.navigateByUrl("main");
  }

}
