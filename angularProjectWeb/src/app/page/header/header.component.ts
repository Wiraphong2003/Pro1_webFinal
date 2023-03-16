import { Component } from '@angular/core';
import { AppdataService } from 'src/app/service/appdata.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  uname: any;
  constructor(
    private dataService: AppdataService,
    private http: HttpClient) { }

  cartLink() {
    console.log("cartLint");
    
  }
}
