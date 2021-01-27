import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentuserService } from 'src/app/currentuser.service';
import { User } from 'src/app/user';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  user:User=new User();
  users;
  user1:User=new User();
  user2:User=new User();
  userName;
  constructor(private currentUser:CurrentuserService,private router:Router,public us:UserserviceService) { 
    console.log(currentUser.getUserData());
    this.user=currentUser.getUserData();
    currentUser.setUserData(this.user);
  }
  reloadData() {
    this.users = this.us.getUsers();

  }
  ngOnInit(): void {
    this.us.getUsers().subscribe(res=>{
      this.users=res;
    })
  }
  deleteUser(user: any) {
    console.log(user.id);
    this.us.deleteUser(user.id).subscribe(data => {
      console.log(data);
      this.reloadData();
    }, error => console.log(error));

  }
  editUser(user: any): void {
    console.log("into edit" + user.id);
    localStorage.setItem("id", user.id.toString());
    this.router.navigate(["edit"]);
  }
  logout(){
    this.currentUser.setUserData(null);
    this.user.active=false;
    this.us.update(this.user.id,this.user).subscribe();
    this.router.navigate(['home']);
  }
  viewUser(user3:any){
    localStorage.setItem("id", user3.id.toString());
    let num=localStorage.getItem("id");
    this.us.getUser(+num).subscribe(data => {
      this.user1 = data;
      this.user2.id=this.user1.id;
     this.user2.bankAccountNumber=this.user1.bankAccountNumber;
     this.user2.balance=this.user1.balance;
     this.user2.active=this.user1.active;
     this.user2.type=this.user1.type;
     this.user2.userName=this.user1.userName;
     this.user2.password=this.user1.password;
     this.user2.email=this.user1.email;
     this.user2.phone=this.user1.phone;
      window.alert("userid:"+this.user2.id+" \nusername:"+this.user2.userName+" \nemail:"+this.user2.email+" \nBank Account number:"+this.user2.bankAccountNumber
      +" \nPhone number:"+this.user2.phone+" \nbalance:"+this.user2.balance+" \nisActive:"+this.user2.active+" \nType:"+this.user2.type);});
  }
  Search(){
    if(this.userName==""){
      this.ngOnInit();
    }
    else{
      this.users=this.users.filter(res=>{
        return res.userName.toLocaleLowerCase().match(this.userName.toLocaleLowerCase());
        console.log(res.userName);
      })
    }
  }
  

}
