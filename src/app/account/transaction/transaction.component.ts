import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrentuserService } from 'src/app/currentuser.service';
import { Transaction } from 'src/app/transaction';
import { User } from 'src/app/user';
import { TransactionserviceService } from '../transactionservice.service';
import { UserserviceService } from '../userservice.service';
import{Location} from '@angular/common';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  users:User[]=[];
  users1:User[]=[];
  user:User = new User();
  user1:User = new User();
  submitted = false;
  senderAccNum;
  sender;
  receiverAccNum;
  receiver;
  amount;
  date=new Date();
  transaction:Transaction=new Transaction();
    constructor(private formBuilder: FormBuilder,public us:UserserviceService,public ts:TransactionserviceService,currentUser:CurrentuserService
      ,private router:Location) { 
      
      this.user=currentUser.getUserData();
    currentUser.setUserData(this.user);
    }

  ngOnInit(): void {
  }
  transactionForm= new FormGroup({
    receiverNumber: new FormControl('', Validators.required),
    transferAmount: new FormControl('', Validators.required),
    transactionControl:new FormControl('',Validators.required)
  });
  get f() { return this.transactionForm.controls; }
  isDebitSelected: boolean;
  selectInput(event) {
    let selected = event.target.value;
    if (selected == "debit") {
      this.isDebitSelected = true;
    } else {
      this.isDebitSelected = false;
    }
  }
  onSubmit(){
    if(this.isDebitSelected==true){
      
    this.us.getUsers().subscribe(res=>{
      res.forEach(res=>{
        this.users.push(res);
        console.log(this.users);
      })

      let user2=this.users.filter(res=>{
      return res.bankAccountNumber==this.transactionForm.get('receiverNumber').value
    });
    console.log(user2);
    if(user2[0].bankAccountNumber!=this.user.bankAccountNumber){
    if(this.user.balance>=this.transactionForm.get('transferAmount').value){
      user2[0].balance=user2[0].balance+this.transactionForm.get('transferAmount').value;
      this.user.balance=this.user.balance-this.transactionForm.get('transferAmount').value;
      this.us.update(this.user.id,this.user).subscribe();
      this.us.update(user2[0].id,user2[0]).subscribe();
      this.transaction.sender=this.user.bankAccountNumber;
      this.transaction.receiver=user2[0].bankAccountNumber;
      this.transaction.amount=this.transactionForm.get('transferAmount').value;
      this.transaction.transactionDate=this.date;
      this.transaction.type="debit";
      this.transaction.remarks="debit successfull and your balance is "+this.user.balance;
      this.ts.createTransaction(this.transaction).subscribe();
      alert('Transaction Successfull..\n Amount debited from your account and debited to '+user2[0].userName+' with account number '+this.transaction.receiver);
    }}
    else{
      alert('You cannot debit amount to yourself please select credit');
    }
    
    }); }
    else{
      this.us.getUsers().subscribe(res=>{
        res.forEach(res=>{
          this.users.push(res);
          console.log(this.users);
        })
      if(this.user.balance>=this.transactionForm.get('transferAmount').value){
        this.user.balance=this.user.balance+this.transactionForm.get('transferAmount').value;
        this.us.update(this.user.id,this.user).subscribe();
        this.transaction.sender=this.user.bankAccountNumber;
        this.transaction.receiver=this.user.bankAccountNumber;
        this.transaction.amount=this.transactionForm.get('transferAmount').value;
        this.transaction.transactionDate=this.date;
        this.transaction.type="credit";
      this.transaction.remarks="credit successfull and your balance is "+this.user.balance;
        this.ts.createTransaction(this.transaction).subscribe();
        alert('Transaction Successfull..\n Amount credited to your account');
      }else{
        alert('You cannot credit more than available amount');
      }
      
      });
    }
    console.log(this.users+"hai");
  }
  navBack(){
    this.router.back();
  }
  

}
