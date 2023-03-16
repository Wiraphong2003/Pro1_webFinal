import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Food } from 'src/app/model/food.model';
import { AppdataService } from 'src/app/service/appdata.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  panelOpenState = false;
  FoodOj: Food | undefined;
  constructor(private dataServec: AppdataService,
    private route: Router,
    private http: HttpClient) {

    http.get(dataServec.apiEndpoint + '/foods').subscribe((data: any) => {
      console.log(data);
      this.FoodOj = data;
    });
  }
}
