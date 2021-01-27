import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentuserService {
 userData;
  constructor() { 
    this.userData=null;
  }
  setUserData(val: object){
    this.userData= val;
  }
  getUserData(){
    return this.userData;
  }
}
