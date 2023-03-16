import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppdataService } from 'src/app/service/appdata.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  constructor(private dataServec: AppdataService,
    private route: Router) {
  }
}
