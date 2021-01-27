import { Component, OnInit } from '@angular/core';
import { CurrentuserService } from '../currentuser.service';
import { Transaction } from '../transaction';
import { User } from '../user';
import { TransactionserviceService } from './transactionservice.service';
import{Location} from '@angular/common';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  transactions:Transaction[]=[];
  transactions1:Transaction[]=[];
  transaction:Transaction=new Transaction();
  transaction1:Transaction=new Transaction();
  user:User=new User();
  
  receiver;
  fileName="transactions.xlsx";
  constructor(public ts:TransactionserviceService,currentUser:CurrentuserService,private router:Location) { 
    this.user=currentUser.getUserData();
    currentUser.setUserData(this.user);
    this.transaction1.sender=this.user.bankAccountNumber;
  }
 
  ngOnInit() {
    this.ts.getTransactionByAccNumber(this.user.bankAccountNumber).subscribe(res=>{
      this.transactions=res;
    });
  }
  navBack(){
    this.router.back();
  }
  Search(){
    if(this.receiver==""){
      this.ngOnInit();
    }
    else{
      this.transactions=this.transactions.filter(res=>{
        return res.receiver.toLocaleLowerCase().match(this.receiver.toLocaleLowerCase());
      })
    }
  }
  key='id';
  reverse:boolean = false;
  sort(key){
    this.key = key;
    this.reverse=!this.reverse;
  }
  exportexcel(): void 
 {​​​​​​​​
 let element = document.getElementById('fileName'); 
 const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 const wb: XLSX.WorkBook = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 XLSX.writeFile(wb, this.fileName);

 }​​​​​​​​
}
