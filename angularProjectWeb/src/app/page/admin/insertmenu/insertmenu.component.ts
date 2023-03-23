import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppdataService } from 'src/app/service/appdata.service';

@Component({
  selector: 'app-insertmenu',
  templateUrl: './insertmenu.component.html',
  styleUrls: ['./insertmenu.component.scss']
})
export class InsertmenuComponent {

  constructor(private dataService: AppdataService,private http: HttpClient){

  }
}
