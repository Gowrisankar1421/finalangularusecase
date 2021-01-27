import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { CurrentuserService } from '../currentuser.service';
import { User } from '../user';
import {Location} from '@angular/common';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  user:User=new User();

  constructor(currentUser:CurrentuserService,private router:Location) { 
    console.log(currentUser.getUserData());
    this.user=currentUser.getUserData();
   }

  ngOnInit(): void {
  }
  navBack(){
    this.router.back();
  }

}
