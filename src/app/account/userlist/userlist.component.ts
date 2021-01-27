import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { UserserviceService } from '../userservice.service';
import{Location} from '@angular/common';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users:User[]=[];
  user:User=new User();
  constructor(public us:UserserviceService,private router:Location){ }

  ngOnInit():void{
    
    this.us.getUsers().subscribe((response)=>{
      this.users=response;
    });
  }

  navBack(){
    this.router.back();
  }
}
