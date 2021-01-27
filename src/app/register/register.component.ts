import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../account/userservice.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  submitted = false;
  users:User[]=[];
  user:User=new User();
  constructor(private formBuilder: FormBuilder,public us:UserserviceService,public router:Router) { }

  ngOnInit() { }
  registerForm= new FormGroup({
    userName: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required,Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword:new FormControl('',[Validators.required,Validators.minLength(6)])
  });
 
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      else{
        
    let pass = this.registerForm.get('password').value;
    let confirmPass = this.registerForm.get('confirmPassword').value;
    console.log(pass);
    console.log(confirmPass);
    if(pass == confirmPass){
        this.user.email=this.registerForm.get('email').value;
        this.user.userName=this.registerForm.get('userName').value;
        this.user.phone=this.registerForm.get('phone').value;
        this.user.password=this.registerForm.get('password').value;
        this.user.active=false;
        this.user.type='';
        this.user.bankAccountNumber='';
        this.user.balance=0;
        console.log(this.user);
        this.us.createUsers(this.user).subscribe();
        this.registerForm.reset();
       alert("Registration successfull  now login");
        this.router.navigate(['login']);
    }
    else{
          alert("Password and confirm password not match.");
        }
      }
  }
  onLogin(){
    this.router.navigate(['login']);
  }
  onHome(){
    this.router.navigate(['home']);
  }

}
