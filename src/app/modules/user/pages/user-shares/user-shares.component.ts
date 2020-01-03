import { Component, OnInit, ViewChild } from '@angular/core';
import { StockService } from 'src/app/_services/stock.service';
import { TokenStorage } from 'src/app/modules/root/components/token.storage';
import { ContextService } from 'src/app/_services/context.service';
import { forkJoin } from 'rxjs';
import { ApiResponse } from 'src/app/_models/apiResponse';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SHARE } from 'src/app/_mocks/shareMock';
import { Stock } from 'src/app/_models/stock.model';
import { Share } from 'src/app/_models/share.model';
import { Context } from 'src/app/_models/context.model';
import { StockTableDataSource } from './stockTableDataSource';

@Component({
  selector: 'app-user-shares',
  templateUrl: './user-shares.component.html',
  styleUrls: ['./user-shares.component.scss']
})
export class UserSharesComponent implements OnInit {
  /**
   * Provided by Angular Material holds Stocks array for table
   */
  dataSource;
  /**
  * Displayed column by mat-table  
  */
  displayedColumns: string[] = ['name', 'abbreviation', 'currentPrice', 'priceDelta', 'buttons'];
  /**
   * Currently logged user data
   */
  userContext: Context;

  serviceStatus: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private stockService: StockService,
    private tokenStorage: TokenStorage,
    private contextService: ContextService
  ) { }

  ngOnInit() {
    this.getDataFromApi();

    console.log(this.dataSource);
  }

  /**
  * Get data from API for logged user
  */
  getDataFromApi(): void {
    this.serviceStatus = 'loading'
    forkJoin([
      this.stockService.getStocks(),
      this.contextService.getContext()
    ]).subscribe(([s, c]: [ApiResponse, ApiResponse]) => {
      this.userContext = c.data;
      console.log(this.userContext);
      this.dataSource = new MatTableDataSource(this.createDataSource(s.data, this.userContext.shares));
      this.dataSource.sort = this.sort;
      this.serviceStatus = 'OK'
    },
      error => {
        this.serviceStatus = 'error'
      });
  }
  /**
   * Merge data from shares and stock. And create data source for table
   * 
   * @param stocks stocks data
   * @param shares shares owned by user
   */
  createDataSource(stocks: Stock[], shares: Share[]): StockTableDataSource[] {
    var tableDataSource: StockTableDataSource[] = [];
    shares.forEach((share: Share) => {
      var dataElement: StockTableDataSource = new StockTableDataSource;
      var stock = stocks.find(stock => stock.id == share.stockId);
      dataElement.stockId = stock.id;
      dataElement.shareId = share.id;
      dataElement.name = stock.name;
      dataElement.abbreviation = stock.abbreviation;
      dataElement.currentPrice = stock.currentPrice;
      dataElement.priceDelta = stock.priceDelta;
      dataElement.ownedAmount = share.amount
      if (dataElement.ownedAmount > 0)
        tableDataSource.push(dataElement)
    })
    return tableDataSource;
  }

}
