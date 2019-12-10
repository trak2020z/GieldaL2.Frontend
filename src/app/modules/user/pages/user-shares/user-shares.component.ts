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
import { StockTableDataSource } from 'src/app/_helpers/stockTableDataSource';
import { Context } from 'src/app/_models/context.model';

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
    forkJoin([
      this.stockService.getStocks(),
      this.contextService.getContext()
    ]).subscribe(([s, c]: [ApiResponse, ApiResponse]) => {
      this.userContext = c.data;
      console.log(this.userContext);
      this.dataSource = new MatTableDataSource(this.createDataSource(s.data, SHARE));
      this.dataSource.sort = this.sort;
    });
  }
  /**
   * Copy walues from stock to table data source.
   * if stock is owned by user(share) add number of shares 
   * 
   * @param stocks stocks data
   * @param shares shares owned by user
   */
  createDataSource(stocks: Stock[], shares: Share[]): StockTableDataSource[] {
    var tableDataSource: StockTableDataSource[] = [];
    shares.forEach((share: Share) => {
      var dataElement: StockTableDataSource = new StockTableDataSource;
      var stock = stocks.find(stock => stock.id == share.stockId); 
      dataElement.id = stock.id;
      dataElement.name = stock.name;
      dataElement.abbreviation = stock.abbreviation;
      dataElement.currentPrice = stock.currentPrice;
      dataElement.priceDelta = stock.priceDelta;
      dataElement.ownedAmount = share.amount
      tableDataSource.push(dataElement)
    })
    return tableDataSource;
  }

}
