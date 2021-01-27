import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../account/userservice.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { CurrentuserService } from '../currentuser.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users:User[]=[];
  user:User=new User();
    submitted = false;
    constructor(private formBuilder: FormBuilder,public us:UserserviceService, private router:Router,private currentUser:CurrentuserService,public router1:Location) { }

  ngOnInit():void { 
     }
  loginForm= new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  get f() { return this.loginForm.controls; }
  /* onLoginPress(){
   
  } */
  onSubmit() {
    this.us.getUsers().subscribe((response)=>{
      this.users=response;
    });
    this.submitted = true;
    let usrname = this.loginForm.get('userName').value;
    let pwd=this.loginForm.get('password').value;
    for( this.user of this.users){
      
      if((usrname==this.user.userName)&&(pwd==this.user.password)){
        console.log(this.user.userName);
        console.log(this.user.password);
        if(this.user.type=='user'){
          this.currentUser.setUserData(this.user);
          this.user.active=true;
          this.us.update(this.user.id,this.user).subscribe();
          this.router.navigate(['normaluser']);
        }
        if(this.user.type=='admin'){
          this.currentUser.setUserData(this.user);
          this.user.active=true;
          this.us.update(this.user.id,this.user).subscribe();
          this.router.navigate(['admin']);
        }
        if((this.user.type!='user')&&(this.user.type!='admin')){
          alert("You are not authorized user...please wait for admin to give you access");
        }
      }
      
    }
    
    if (this.loginForm.invalid) {
      
        alert("please provide correct login credentials");
     
        return;
    }
  }
  onRegister(){
    this.router.navigate(['register']);
  }
  onHome(){
    this.router.navigate(['home']);
  }

}
