import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppdataService } from 'src/app/service/appdata.service';
import { LocalService } from 'src/app/service/local.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent {
  foodcart!: any[];
  amountALL !: any;
  vatamount !: any;
  totaldef!: any;

  Fname !: any;
  Lname !: any;
  address !: any;
  phone !: any;
  detail !: any;
  cart_ids: any;
  cartSTR: string = "";
  time: string = ""

  arraycartAmounts !: any;

  constructor(private dataService: AppdataService,
    private dialogRef: MatDialogRef<DetailOrderComponent>,
    private route: Router,
    private http: HttpClient,
    private localS: LocalService
  ) {
    this.totaldef = dataService.total;
    this.http.get(this.dataService.apiEndpoint + '/cart/' + localS.getData("USER")).subscribe((data: any) => {
      console.log(data);
      this.foodcart = data
    });
    this.http.get(this.dataService.apiEndpoint + '/cartsumprice/' + localS.getData("USER")).subscribe((data: any) => {
      console.log(data);
      console.log(data[0]);
      let total = data[0].total
      console.log("TOTAL:" + total);
      this.amountALL = total
    });
    this.http.get(this.dataService.apiEndpoint + '/getcart_id/' + this.localS.getData("USER")).subscribe((data: any) => {
      this.cart_ids = data;

    });
    this.vatamount = (0.07 * this.dataService.total) + this.dataService.total
    console.log((0.07 * this.dataService.total) + this.dataService.total);
  }
  close() {
    this.dialogRef.close();
  }

  confirm() {
    // console.log("YES");
    // console.log("Name" + this.Fname + "  " + this.Lname);
    // console.log("phone: " + this.phone);
    // console.log("address: " + this.address);
    // console.log("detail: " + this.detail);
    const now = new Date();
    // console.log(this.cart_ids);
    this.cartSTR = ""
    this.cart_ids.forEach((element: any) => {
      let cid: String = element.cart_id
      this.cartSTR += cid + ',';
      // console.log(this.cartSTR);
    });
    // console.log("Ans " + this.cartSTR);
    // console.log((this.cartSTR.trim()).split(','));
    const editedText = this.cartSTR.slice(0, -1)
    this.time = now.toLocaleString();

    let Json = {
      cname: this.Fname + " " + this.Lname,
      cphone: this.phone,
      address: this.address,
      detail: this.detail,
      totalPrice: this.vatamount,
      time: this.time,
      status: "ยังไม่ส่ง",
      cusid: this.localS.getData("USER"),
      cartSTR: editedText
    }
    console.log(Json);
    this.http.post(this.dataService.apiEndpoint + '/insertIorder',
      (JSON.stringify(Json))).subscribe((e: any) => {
        console.log(e);
        let oided = e.oid;
        console.log("oided: " + oided);

        let jjj = {
          "oid": oided,
          "uid": this.localS.getData("USER"),
        }
        this.http.post(this.dataService.apiEndpoint + '/updatecartOID',
          (JSON.stringify(jjj))).subscribe((e: any) => {

            this.http.get(this.dataService.apiEndpoint + '/getcartOid/' + oided).subscribe((data: any) => {
              // console.log(data);
              this.arraycartAmounts = data;
              this.arraycartAmounts.forEach((element: any) => {
                let ss = {
                  cart_id: element.cart_id,
                  uid: element.uid,
                  food_id: element.food_id,
                  amount: element.amount,
                  oid: element.oid
                }
                console.log(ss);
                this.http.post(this.dataService.apiEndpoint + '/pushcartAmount',
                  (JSON.stringify(ss))).subscribe((e: any) => {
                    console.log(e);
                  });
              });

            });

          });



      });


    this.dialogRef.close();
  }


}
