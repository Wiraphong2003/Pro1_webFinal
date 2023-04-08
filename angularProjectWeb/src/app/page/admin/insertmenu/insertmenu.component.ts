import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppdataService } from 'src/app/service/appdata.service';
import { LocalService } from 'src/app/service/local.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-insertmenu',
  templateUrl: './insertmenu.component.html',
  styleUrls: ['./insertmenu.component.scss']
})
export class InsertmenuComponent {
  fid!: any;
  name!: any;
  price!: number;
  img!: any;
  type!: any;
  Foods !: any;
  lastF !: any;
  foods!: any;
  TT!: any;

  constructor(
    private dialogRef: MatDialogRef<InsertmenuComponent>,
    private dataService: AppdataService,
    private http: HttpClient,
    private localUer: LocalService) {

    http.get(dataService.apiEndpoint + '/types').subscribe((types: any) => {
      this.type = types;
    });

    http.get(dataService.apiEndpoint + '/foods').subscribe((data: any) => {
      // console.log(data);
      this.Foods = data;
      let ss = this.Foods[this.Foods.length - 1].fid
      // console.log(ss);
      let str = ss.substring(1, ss.length)
      // console.log(str);
      this.lastF = str;
      let upstr = parseInt(this.lastF) + 1
      this.fid = "f" + upstr;
      console.log(this.fid);

      // console.log(parseInt(this.lastF) + 1);


    });
    // let ss = this.Foods[this.Foods.length - 1].fid
    // console.log(ss);

    // let str = ss.substring(1, ss.length - 1)
    // console.log(str);

  }
  allMenu() {
    this.http.get(this.dataService.apiEndpoint + '/foods').subscribe((data: any) => {
      console.log(data);
      this.foods = data;
    });
  }
  getMenu(type: string) {
    console.log("Type: " + type);
    this.TT = type;
    // this.http.post(this.dataService.apiEndpoint + '/typees',
    //   (JSON.stringify({ "type": type }))).subscribe((types: any) => {
    //     this.foods = types;
    //   });
  }
  close() {
    this.dialogRef.close();
  }

  addFood() {
    let Json = {
      "fid": this.fid,
      "name": this.name,
      "price": this.price,
      "img": this.img,
      "type": this.TT
    }
    console.log(Json);
    this.http.post(this.dataService.apiEndpoint + '/insertmenu',
      (JSON.stringify(Json))).subscribe((e: any) => {
        console.log(e);
      });
    this.dialogRef.close();

  }
}
