import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AppdataService } from 'src/app/service/appdata.service';
import { LocalService } from 'src/app/service/local.service';
import { Observable } from 'rxjs'
@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.scss']
})
export class OrderAdminComponent {
  panelOpenState = false;

  listOrder!: any;
  listcart_id !: any;
  listcartArray !: any[];
  arrayFood!: any;
  Food: any;
  constructor(
    private http: HttpClient,
    private localS: LocalService,
    private dataService: AppdataService,
    private router :Router
  ) {

    this.http.get(this.dataService.apiEndpoint + '/getlistorder').subscribe((data: any) => {
      this.listOrder = data;
      console.log(this.listOrder);
      data.forEach((element: any) => {
        // if(element.cusid)
        let cid: String = element.cartSTR
        console.log("cartSTR: " + cid);
        this.listcart_id = cid;
        this.listcartArray = cid.split(",");
        console.log(this.listcartArray);
      });
    });

    this.http.get(this.dataService.apiEndpoint + '/getlistFoodorders').subscribe((data: any) => {
      this.Food = data;
    });


    // let text;
    // if (confirm("ยืนยันการสั่งชื้อ") == true) {
    //   text = "You pressed OK!";
    //   let Jsonamount = {
    //     oid: ,
    //     uid: this.localS.getData("USER"),
    //   }
    //   this.http.post(this.dataService.apiEndpoint + '/deletecart',
    //     (JSON.stringify(Jsonamount))).subscribe((e: any) => {
    //       console.log(e);
    //     });
    // } else {
    //   text = "You canceled!";
    // }

    // let ss = this.listcart_id.split(",");
    // console.log(ss);


  }
  backmain() {
    this.router.navigateByUrl("admin");
  }

  getdetailFood(str: any): Observable<any> {
    return this.http.get(this.dataService.apiEndpoint + '/getFoodname/' + str);
  }
  confirm(oid: any) {
    console.log("OK");
    let Jsonamount = {
      oid: oid
    }
    this.http.post(this.dataService.apiEndpoint + '/updatestatus',
      (JSON.stringify(Jsonamount))).subscribe((e: any) => {
        console.log(e);
        this.http.get(this.dataService.apiEndpoint + '/getlistorder').subscribe((data: any) => {
          this.listOrder = data;
          console.log(this.listOrder);
          data.forEach((element: any) => {
            // if(element.cusid)
            let cid: String = element.cartSTR
            console.log("cartSTR: " + cid);
            this.listcart_id = cid;
            this.listcartArray = cid.split(",");
            console.log(this.listcartArray);
          });
        });
      });
  }

}
