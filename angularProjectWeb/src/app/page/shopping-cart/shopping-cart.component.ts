import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Food } from 'src/app/model/food.model';
import { Localorder } from 'src/app/model/localorder.model';
import { ProductService } from 'src/app/serice/product.service';
import { AppdataService } from 'src/app/service/appdata.service';
import { LocalService } from 'src/app/service/local.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent{
  [x: string]: any;

  amounts!: Localorder;

  counts = 0;
  amountALL !: any;
  productList!: any[];
  products: any[] = [];
  subTotal!: any;
  foodcart!: any[];
  constructor(private dataService: AppdataService,
    private route: Router,
    private http: HttpClient,
    private local: ProductService,
    private router: Router,
    private localS: LocalService,
    private dialog:MatDialog) {
    this.local.loadCart();
    this.products = this.local.getProduct();
    this.local.setCount();

    this.http.get(this.dataService.apiEndpoint + '/cartsumprice/' + localS.getData("USER")).subscribe((data: any) => {
      console.log(data);
      console.log(data[0]);
      let total = data[0].total
      console.log("TOTAL:" + total);
      this.amountALL = total
    });

    this.http.get(this.dataService.apiEndpoint + '/cart/' + localS.getData("USER")).subscribe((data: any) => {
      console.log(data);
      this.foodcart = data
    });

  }
  getTotal() {
    this.http.get(this.dataService.apiEndpoint + '/cartsumprice/' + this.localS.getData("USER")).subscribe((data: any) => {
      console.log(data);
      console.log(data[0]);
      let total = data[0].total
      console.log("TOTAL:" + total);
      this.amountALL = total
    });
  }
  removeFromCart(fid: any) {
    let text;
    if (confirm("คุณต้องการลบสินค้าออกจากตะกร้าหรือไม่") == true) {
      text = "You pressed OK!";
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
            this.getTotal()
          });
        });
    } else {
      text = "You canceled!";
    }

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
          this.getTotal()

        });

      });
  }
  removeAmont(fid:any,amount:any) {
    if (amount > 1) {
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
          this.getTotal()

        });
      });
    } else {
      // this.dataService.FoodServic  = fid
      // this.dialog.open(ConfirmComponent, {
      //   width: '350px'
      // })
      this.removeFromCart(fid)
      // let text;
      // if (confirm("คุณต้องการลบสินค้าออกจากตะกร้าหรือไม่") == true) {
      //   text = "You pressed OK!";
      //   this.removeFromCart(fid)
      // } else {
      //   text = "You canceled!";
      // }
    }
    console.log(fid);
    console.log(amount);
  }

  backmain() {
    this.router.navigateByUrl("main");
  }
  payment(){
    console.log(this.localS.getData("USER"));

    console.log(this.foodcart);
    const JSONs = this.foodcart;
  }
}
