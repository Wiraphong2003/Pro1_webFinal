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
  username!: string;
  password!: string;
  constructor(private http: HttpClient,
    private router:Router
  ) {


  }
  login() {
    console.log("Login");
    let Json = { username: this.username, password: this.password };
    this.http.post('http://localhost:9999/webAPI_ProjectWebFinal/login',
      JSON.stringify(Json))
      .subscribe((response: any) => {
        console.log(response);

      }, Error => {
        console.log("Fail");
      });
  }
}
