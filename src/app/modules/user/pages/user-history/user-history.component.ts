import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/_models/transaction';
import { TransactionService } from 'src/app/_services/transaction.service';
import { UserHistoryDataElement } from './userHistoryDataElement';
import { StockService } from 'src/app/_services/stock.service';
import { forkJoin } from 'rxjs';
import { Stock } from 'src/app/_models/stock.model';

/**
 * The User transaction history component
 */
@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})

export class UserHistoryComponent implements OnInit {
  /**
   * Temporary used for test only
   */
  readonly USER_ID: Number = 1;

  /**
   * Stores transactions history fo user
   */
  transactions: Transaction[];
  /**
* Displayed column by mat-table  
*/
  displayedColumns: string[] = ['stockName', 'amount', 'price', 'finalPrice'];
  /**
   * Stores data displayed by table
   */
  dataSource: UserHistoryDataElement[] = [];

  /**
  * Default constructor defining services
  * 
  * @param tansactionService
  * @param stockService 
  */
  constructor(private tansactionService: TransactionService,
    private stockService: StockService) {
  }


  ngOnInit() {
    this.getTableData();
  }

  /**
   * Gets data from services, and filter treasactions for currently logged user
   */
  getTableData(): void {
    forkJoin([
      this.tansactionService.getTransactions(),
      this.stockService.getStocks()
    ]).subscribe(([t, s]: [Transaction[], Stock[]]) => {
      this.transactions = t.filter(t => t.buyerId == this.USER_ID || t.sellerId == this.USER_ID)
      this.transactions.forEach((t: Transaction) => this.pushDataElemet(t, s))
    })
  }

  /**
   * Map transaction to match table row, replace stockId with stock name, and set transaction type based on selerId an buyerId
   * @param t transaction to map
   * @param s stock list
   */
  pushDataElemet(t: Transaction, s: Stock[]): void {
    var dataElement: UserHistoryDataElement = {
      stockName: s[t.stockId.toString()].name,
      amount: t.amount,
      price: t.price,
      finalPrice: t.amount.valueOf() * t.price.valueOf(),
      type: (t.buyerId == this.USER_ID) ? "bougth" : (t.sellerId == this.USER_ID) ? "sold" : " ",
    }
    this.dataSource.push(dataElement);
  }

}
