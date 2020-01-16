import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaction } from 'src/app/_models/transaction';
import { TransactionService } from 'src/app/_services/transaction.service';
import { UserHistoryDataElement } from './userHistoryDataElement';
import { StockService } from 'src/app/_services/stock.service';
import { forkJoin } from 'rxjs';
import { Stock } from 'src/app/_models/stock.model';
import { ApiResponse } from 'src/app/_models/apiResponse';
import { ContextService } from 'src/app/_services/context.service';
import { MatTableDataSource } from '@angular/material';
import {PageEvent, MatPaginator} from '@angular/material/paginator';

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
  * Displayed column by mat-table  
  */
  displayedColumns: string[] = ['stockName', 'amount', 'price', 'finalPrice'];
  /**
   * Stores data displayed by table
   */
  dataSource: MatTableDataSource<UserHistoryDataElement>;

  /**
   * Currently logged ueser id
   */
  loggedUserId: Number;

  /**
   * Used by serviveStatus component
   */
  serviceStatus: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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
    this.serviceStatus = 'loading';
    forkJoin([
      this.tansactionService.getTransactions(),
      this.stockService.getStocks(),
      this.contextService.getContext()
    ]).subscribe(([t, s, c]: [ApiResponse, ApiResponse, ApiResponse]) => {
      this.loggedUserId = c.data.user.id;
      var transactions = t.data.filter(t => t.buyerId == this.loggedUserId || t.sellerId == this.loggedUserId)
      this.dataSource = new MatTableDataSource(this.pushDataElemet(transactions, s.data));
      this.dataSource.paginator = this.paginator;
      this.serviceStatus = 'OK'
    },
      error => {
        this.serviceStatus = 'error'
      });
  }

  /**
   * Map transaction to match table row, replace stockId with stock name, and set transaction type based on selerId an buyerId
   * @param t transaction to map
   * @param s stock list
   */
  pushDataElemet(transactions: Transaction[], stocks: Stock[]): UserHistoryDataElement[] {
    var tableDataSource: UserHistoryDataElement[] = []

    transactions.forEach((transaction: Transaction) => {
      var dataElement: UserHistoryDataElement = new UserHistoryDataElement;
      dataElement.stockName = stocks.find(stock => stock.id == transaction.stockId).name;
      dataElement.amount = transaction.amount;
      dataElement.price = transaction.price;
      dataElement.finalPrice = transaction.amount.valueOf() * transaction.price.valueOf();
      dataElement.type = (transaction.buyerId == this.loggedUserId) ? "bougth" : (transaction.sellerId == this.loggedUserId) ? "sold" : " ";
      tableDataSource.push(dataElement);
    })
    tableDataSource.reverse();
    return tableDataSource;
  }
}
