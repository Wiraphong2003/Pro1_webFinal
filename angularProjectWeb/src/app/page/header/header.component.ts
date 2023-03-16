import { Component } from '@angular/core';
import { AppdataService } from 'src/app/service/appdata.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  uname: any;
  foods: any = '';
  constructor(
    private dataService: AppdataService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router) { }
  cartLink() {
    console.log("cartLint");
    this.router.navigateByUrl("/cart");
  }
}
