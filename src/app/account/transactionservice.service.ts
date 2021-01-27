import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionserviceService {
  transaction;
  
  constructor(private http: HttpClient,private router:Router) { 
    this.transaction={};
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  url: string = "http://localhost:3000/transactions";
  getTransactions(){
    return this.http.get<Transaction[]>(this.url);
  }
  createTransaction(transaction: Transaction) {
    return this.http.post(this.url,transaction);
  }
  setTransactionsByAccNumber(val:Transaction){
    return this.transaction=val;
  }
  getTransactionByAccNumber(val:string){
    return this.http.get<Transaction[]>(this.url+"?sender="+val);
  }

}
