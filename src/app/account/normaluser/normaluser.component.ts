import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CurrentuserService } from 'src/app/currentuser.service';
import { User } from 'src/app/user';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-normaluser',
  templateUrl: './normaluser.component.html',
  styleUrls: ['./normaluser.component.css']
})
export class NormaluserComponent implements OnInit {

  user:User=new User();

  constructor( private currentUser:CurrentuserService,private router:Router,private us:UserserviceService) { 
    console.log(currentUser.getUserData());
    this.user=currentUser.getUserData();
    currentUser.setUserData(this.user);
  }

  ngOnInit(): void {
  }
  onDetails(){
    this.router.navigate(['details']);
  }
  logout(){
    this.currentUser.setUserData(null);
    this.user.active=false;
    console.log(this.user);
    this.us.update(this.user.id,this.user).subscribe();
    this.router.navigate(['home']);
  }

}
