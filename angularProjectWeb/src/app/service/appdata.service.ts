import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppdataService {
  apiEndpoint = 'http://localhost:9999/webAPI_ProjectWebFinal';
  FoodServic: any;
  isShowCart!: any;
  userNow:any;
  total:any;
  constructor() { }
}
