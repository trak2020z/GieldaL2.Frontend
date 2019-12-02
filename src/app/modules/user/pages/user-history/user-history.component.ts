import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/_models/transaction';
import { TransactionService } from 'src/app/_services/transaction.service';
import { UserHistoryDataElement } from './userHistoryDataElement';
import { StockService } from 'src/app/_services/stock.service';
import { forkJoin } from 'rxjs';
import { Stock } from 'src/app/_models/stock.model';
import { ApiResponse } from 'src/app/_models/apiResponse';
import { ContextService } from 'src/app/_services/context.service';

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
   * Currently logged ueser id
   */
  loggedUserId: Number;

  /**
  * Default constructor defining services
  * 
  * @param tansactionService
  * @param stockService 
  * @param contextService
  */
  constructor(
    private tansactionService: TransactionService,
    private stockService: StockService,
    private contextService: ContextService
  ) { }


  ngOnInit() {
    this.getTableData();
  }

  /**
   * Gets data from services, and filter treasactions for currently logged user
   */
  getTableData(): void {
    forkJoin([
      this.tansactionService.getTransactions(),
      this.stockService.getStocks(),
      this.contextService.getContext()
    ]).subscribe(([t, s, c]: [ApiResponse, ApiResponse, ApiResponse]) => {
      this.loggedUserId = c.data.user.id;
      this.transactions = t.data.filter(t => t.buyerId == this.loggedUserId || t.sellerId == this.loggedUserId)
      this.transactions.forEach((t: Transaction) => this.pushDataElemet(t, s.data))
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
      type: (t.buyerId == this.loggedUserId) ? "bougth" : (t.sellerId == this.loggedUserId) ? "sold" : " ",
    }
    this.dataSource.push(dataElement);
  }

}
