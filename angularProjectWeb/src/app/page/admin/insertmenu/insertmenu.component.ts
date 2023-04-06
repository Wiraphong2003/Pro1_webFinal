import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppdataService } from 'src/app/service/appdata.service';
import { LocalService } from 'src/app/service/local.service';

@Component({
  selector: 'app-insertmenu',
  templateUrl: './insertmenu.component.html',
  styleUrls: ['./insertmenu.component.scss']
})
export class InsertmenuComponent {
  fid!: any;
  name!: any;
  price!: any;
  img!: any;
  type!: any;

  constructor(
    private dataService: AppdataService,
    private http: HttpClient,
    private localUer: LocalService) {
    this.http.get(this.dataService.apiEndpoint + '/cart/' + localUer.getData("USER")).subscribe((data: any) => {
      let last !: any;
      data.forEach((ss: any) => {
        last = alert(data[data.length - 1]);
      });
      console.log(last);

    });
  }

  addFood() {
    let Json = {
      fid: this.fid,
      namd: this.name,
      price: this.price,
      img: this.img,
      type: this.type
    }
    console.log("addFood");
    console.log(Json);

    // this.http.post(this.dataService.apiEndpoint + '/insertmenu',
    //   (JSON.stringify(Json))).subscribe((e: any) => {
    //     console.log(e);
    //   });
  }
}
