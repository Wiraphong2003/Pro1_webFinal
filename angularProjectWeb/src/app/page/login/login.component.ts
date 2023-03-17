import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppdataService } from 'src/app/service/appdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private dataServiec: AppdataService,
    private http: HttpClient,
    private router:Router
  ) {

  }
  sumbit() {
    console.log("OK SUBMIT");
    this.router.navigateByUrl("main");
  }
}
