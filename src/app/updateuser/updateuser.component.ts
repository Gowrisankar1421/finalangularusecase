import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../account/userservice.service';
import { User } from '../user';
import{Location} from '@angular/common';


@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {


  user: User = new User();
  user1: User = new User();


  constructor(private router: Router, private us: UserserviceService,private router1:Location) { }
  editCustomer() {
    
  }
  ngOnInit() :void{
    
  }
  onUpdate() {
    console.log("into update");
    console.log(this.user.id+","+this.user.userName+","+this.user.email+","+this.user.phone+","+this.user.bankAccountNumber);
    let id = localStorage.getItem("id");
    this.us.getUser(+id).subscribe(data => {
      this.user1 = data;
      this.user.id=this.user1.id;
     this.user.bankAccountNumber=this.user.bankAccountNumber;
     this.user.balance=this.user.balance;
     this.user.active=this.user.active;
     this.user.type=this.user.type;
     this.user.userName=this.user1.userName;
     this.user.password=this.user1.password;
     this.user.email=this.user1.email;
     this.user.phone=this.user1.phone;
     this.us.update(this.user.id, this.user).subscribe(data => { console.log(data); }, error => console.log(error));
     this.router.navigate(['userlist']);

    })
    

  }
  navBack(){
    this.router1.back();
  }

}
