import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Food } from 'src/app/model/food.model';
import { AppdataService } from 'src/app/service/appdata.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  foods: any;
  FoodOj!: Food
  constructor(private dataService: AppdataService,
    private dialogRef: MatDialogRef<EditComponent>,
    private http: HttpClient,
  ) {
    this.foods = dataService.FoodServic;
    console.log(this.foods);

  }
  close() {
    this.dialogRef.close();
  }

  update(name: any, price: number, img: any, type: any, fid: any) {
    console.log(fid);
    let Json = {
      "name": name,
      "price": price,
      "img": img,
      "type": type,
      "fid": fid
    }
    console.log(Json);
    this.http.post(this.dataService.apiEndpoint + '/updatemenu', (JSON.stringify(Json))).subscribe((types: any) => {
      this.foods = types;
    });
    this.dialogRef.close();

  }
}
