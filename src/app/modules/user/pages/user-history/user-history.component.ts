import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/_models/transaction';
import { TransactionService } from 'src/app/_services/transaction.service';
import { UserHistoryDataElement } from './userHistoryDataElement';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})

export class UserHistoryComponent implements OnInit {
  readonly USER_ID: Number = 1;

  transactions: Transaction[];
  displayedColumns: string[] = ['stockName', 'amount', 'price', 'finalPrice'];
  dataSource: UserHistoryDataElement[] = [];

  constructor(private tansactionService: TransactionService) {
  }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions(): void {
    this.tansactionService.getTransactions()
      .subscribe(t => {
      this.transactions = t.filter(t => t.buyerId == this.USER_ID || t.sellerId == this.USER_ID)
        this.transactions.forEach((t: Transaction) => this.pushDataElemet(t))
      })
  }

  pushDataElemet(t: Transaction): void {
    var dataElement: UserHistoryDataElement = {
      stockName: t.id.toString(),
      amount: t.amount,
      price: t.price,
      finalPrice: t.amount.valueOf() * t.price.valueOf()
    }
    this.dataSource.push(dataElement);
  }

}
