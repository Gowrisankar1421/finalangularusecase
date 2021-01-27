import { Component, OnInit } from '@angular/core';
import { TransactionserviceService } from '../account/transactionservice.service';
import{Location} from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-transactioins',
  templateUrl: './transactioins.component.html',
  styleUrls: ['./transactioins.component.css']
})
export class TransactioinsComponent implements OnInit {
   transactions;
   sender;
   fileName="all_transactions.xlsx";
  constructor(public ts:TransactionserviceService,private router:Location) { }

  ngOnInit() {
    this.ts.getTransactions().subscribe(res=>{
      this.transactions=res;
    })
  }
  Search(){
    if(this.sender==""){
      this.ngOnInit();
    }
    else{
      this.transactions=this.transactions.filter(res=>{
        return res.sender.toLocaleLowerCase().match(this.sender.toLocaleLowerCase());
      })
    }
  }
  
  key='id';
  reverse:boolean = false;
  sort(key){
    this.key = key;
    this.reverse=!this.reverse;
  }
  /* key1='amount';
  sort1(key1){
    this.key1 = key1;
    this.reverse=!this.reverse;
  } */
  navBack(){
    this.router.back();
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
