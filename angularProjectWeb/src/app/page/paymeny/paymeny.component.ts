import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppdataService } from 'src/app/service/appdata.service';
import { LocalService } from 'src/app/service/local.service';

@Component({
  selector: 'app-paymeny',
  templateUrl: './paymeny.component.html',
  styleUrls: ['./paymeny.component.scss']
})
export class PaymenyComponent {
  constructor(private dialogRef: MatDialogRef<PaymenyComponent>,
    private http: HttpClient,
    private localS: LocalService,
    private dataService: AppdataService,
    private router: Router
  ){

  }
  close() {
    this.dialogRef.close();
  }
  OK(){
    console.log("OK");
    this.dialogRef.close();
  }

}
