import { Component } from '@angular/core';
import { AppdataService } from 'src/app/service/appdata.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/serice/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  uname: any;
  foods: any = '';
  count: any;
  isshow: any;
  constructor(
    private dataService: AppdataService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private local: ProductService) {
    local.setCount()
    this.count = local.getCount();
    // console.log(this.count);
    this.isshow = dataService.isShowCart;
    // console.log(this.isshow);

  }
  cartLink() {
    console.log("cartLint");
    this.router.navigateByUrl("/cart");
  }
}


