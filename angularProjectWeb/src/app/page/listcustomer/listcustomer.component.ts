import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppdataService } from 'src/app/service/appdata.service';
import { LocalService } from 'src/app/service/local.service';

@Component({
  selector: 'app-listcustomer',
  templateUrl: './listcustomer.component.html',
  styleUrls: ['./listcustomer.component.scss']
})
export class ListcustomerComponent {

  panelOpenState = false;

  listOrder!: any;
  listcart_id !: any;
  listcartArray !: any[];
  arrayFood!: any;
  Food: any;
  constructor(private router: Router,
    private http: HttpClient,
    private dataService: AppdataService,
    private local: LocalService) {

    this.http.get(this.dataService.apiEndpoint + '/ioders/' + local.getData("USER")).subscribe((data: any) => {
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

    this.http.get(this.dataService.apiEndpoint + '/getlistFoodorders/'+ local.getData("USER")).subscribe((data: any) => {
      this.Food = data;
    });

  }
  backmain() {
    this.router.navigateByUrl("main");
  }
}
