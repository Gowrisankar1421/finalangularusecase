import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../account/userservice.service';
import { CurrentuserService } from '../currentuser.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  
  currentUser;
  isLogin;
  constructor(private us:UserserviceService,private cs:CurrentuserService){
    this.currentUser=this.cs.getUserData();
    console.log(this.cs.getUserData());
    this.isLogin=this.cur();
    console.log(this.isLogin);
  }
  ngOnInit(): void {

  }
  cur(){
    if(this.currentUser===null){
      return true;
    }
    else{
      return false;
    }
  }

}
