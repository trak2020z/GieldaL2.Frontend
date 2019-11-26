import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../_models/transaction';
import { TRANSACTION } from '../_mocks/transactionsMock';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

  getTransactions(): Observable<Transaction[]>{
    return of(TRANSACTION)
  }
}
