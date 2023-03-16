import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppdataService } from 'src/app/service/appdata.service';
import { MatDialog } from '@angular/material/dialog';
import { AmountComponent } from '../amount/amount.component';
import { InsertmenuComponent } from '../../page/admin/insertmenu/insertmenu.component';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  foods: any = '';
  type: any = '';
  constructor(
    private dataService: AppdataService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    http.get(dataService.apiEndpoint + '/foods').subscribe((data: any) => {
      // console.log(data);
      this.foods = data;
    });
    http.get(dataService.apiEndpoint + '/types').subscribe((types: any) => {
      this.type = types;
    });

  }
  openDialog(){
    this.dialog.open(InsertmenuComponent,{
      width : '350px'
    })
  }

  allMenu() {
    this.http.get(this.dataService.apiEndpoint + '/foods').subscribe((data: any) => {
      console.log(data);
      this.foods = data;
    });
  }
  getMenu(type: string) {
    this.http.post(this.dataService.apiEndpoint + '/typees', (JSON.stringify({ "type": type }))).subscribe((types: any) => {
      this.foods = types;
    });
  }
  amount(foods: string) {
    console.log("amount");
    console.log(foods);
    this.dataService.FoodServic = foods;
    this.dialog.open(AmountComponent, {
      minWidth: '300px'
    })
  }
  delete(fid : any){
    this.http.post(this.dataService.apiEndpoint+'/deletemenu',(JSON.stringify({"fid" : fid}))).subscribe();
    console.log(fid);
  }
  tmp(){
    console.log("tock");

  }
}
