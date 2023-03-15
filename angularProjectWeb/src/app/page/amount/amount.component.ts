import { HttpClient } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Food } from 'src/app/model/food.model';
import { AppdataService } from 'src/app/service/appdata.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent {

  foodOj: Food;
  name = `Angular ${VERSION.major}`;
  amount = 0;
  sumprice = 0;
  constructor(private data: AppdataService,
    private dialogRef: MatDialogRef<AmountComponent>,
    private http: HttpClient) {
    this.foodOj = data.FoodServic;
  }
  close() {
    this.dialogRef.close();
  }
  confirm(fid: string, amount: number) {
    let jsonObj = {
      fid: fid,
      amount: amount,
      sumprice: amount * this.foodOj.price
    }
    let jsonString = JSON.stringify(jsonObj);
    // this.http.put(this.data.apiEndpoint + "/landmark/" + fid, jsonString, { observe: 'response' }).subscribe((response) => {
    //   console.log(JSON.stringify(response.status));
    //   console.log(JSON.stringify(response.body));
    //   this.dialogRef.close();
    // })
  }
  handleMinus() {
    if (this.amount > 0) {
      this.amount--;
      this.sumprice = this.amount * this.foodOj.price;
    }
  }
  handlePlus() {
    this.amount++;
    this.sumprice = this.amount * this.foodOj.price;
  }
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 3, rows: 1, color: '#DDBDF1' },
  ];
}
