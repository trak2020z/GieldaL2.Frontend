import { Component, OnInit, ViewChild } from '@angular/core';
import { Stock } from 'src/app/_models/stock.model';
import { StockService } from 'src/app/_services/stock.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { ApiResponse } from 'src/app/_models/apiResponse';
import { STOCK } from 'src/app/_mocks/stockMock';
import { TokenStorage } from '../../components/token.storage';
import { forkJoin } from 'rxjs';
import { ContextService } from 'src/app/_services/context.service';
import { UserHistoryComponent } from 'src/app/modules/user/pages/user-history/user-history.component';
import { User } from 'src/app/_models/user.model';
import { Context } from 'src/app/_models/context.model';
import { SHARE } from 'src/app/_mocks/shareMock';
import { StockTableDataSource } from 'src/app/_helpers/stockTableDataSource';
import { Share } from 'src/app/_models/share.model';
import { share } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';

/**
 * The Stock component
 */
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  /**
   * Provided by Angular Material holds Stocks array for table
   */
  dataSource;
  /**
  * Displayed column by mat-table  
  */
  displayedColumns: string[] = ['name', 'abbreviation', 'currentPrice', 'priceDelta'];
  /**
   * Parameter for predicate stock name
   */
  filterName: string;
  /**
   * Parameter for predicate max stock price
   */

  filterMaxCurrentPrice: number;
  /**
  * Parameter for predicate min stock price
  */
  filterMinCurrentPrice: number;
  /**
   * Currently logged user data
   */
  userContext: Context;

  serviceStatus: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  /**
  * @ignore
  * 
  * @param stockService 
  */
  constructor(
    private stockService: StockService,
    private tokenStorage: TokenStorage,
    private contextService: ContextService
  ) { }


  /**
   * If user is logged show column with buttons, download data form API
   * else download data form API
   */
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.displayedColumns.push("buttons")
      this.getDataWithLoggedUser();
    }
    else this.getData();

  }

  /**
   * Get data from API for logged user
   */
  getDataWithLoggedUser(): void {
    this.serviceStatus = 'loading'
    forkJoin([
      this.stockService.getStocks(),
      this.contextService.getContext()
    ]).subscribe(([s, c]: [ApiResponse, ApiResponse]) => {
      this.userContext = c.data;
      console.log(this.userContext);
      this.dataSource = new MatTableDataSource(this.createDataSource(s.data, this.userContext.shares));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.serviceStatus = 'OK'
    },
      error => {
        this.serviceStatus = 'error'
      });
  }

  /**
   * Get data from API
   */
  getData(): void {
    this.serviceStatus = 'loading'
    this.stockService.getStocks().subscribe((s: ApiResponse) => {
      this.dataSource = new MatTableDataSource(this.createDataSource(s.data, []));
      this.dataSource.sort = this.sort;
      this.serviceStatus = 'OK'
    },
      error => {
        this.serviceStatus = 'error'
      });
  }

  /**
   * Prediate for data filtering
   * 
   * @param data input data for preficate
   * @returns true if Stack fulfil predicate otherwise false
   */
  customPredicate(data: StockTableDataSource): boolean {
    return (!this.filterMaxCurrentPrice || data.currentPrice <= this.filterMaxCurrentPrice)
      && (!this.filterMinCurrentPrice || data.currentPrice >= this.filterMinCurrentPrice)
      && (!this.filterName || data.name.trim().toLowerCase().includes(this.filterName))
  }

  /**
   * Setup filterName. And and filter data by customPredicate.
   * 
   * @param filterValue (String) falue passed by input field
   */
  applyFilterName(filterValue: string) {
    this.filterName = filterValue.trim().toLowerCase()
    this.dataSource.filterPredicate =
      (data: StockTableDataSource, filter: string) => this.customPredicate(data);

    this.dataSource.filter = " ";
  }

  /**
   * Setup filterMaxValue. And and filter data by customPredicate.
   * 
   * @param filterValue (String) falue passed by input field
   */
  applyFilterMaxValue(filterValue: number) {
    this.filterMaxCurrentPrice = filterValue;
    this.dataSource.filterPredicate =
      (data: StockTableDataSource, filter: string) => this.customPredicate(data);

    this.dataSource.filter = " ";
  }

  /**
   * Setup filterMinValue. And and filter data by customPredicate.
   * 
   * @param filterValue (String) falue passed by input field
   */
  applyFilterMinValue(filterValue: number) {
    this.filterMinCurrentPrice = filterValue;
    this.dataSource.filterPredicate =
      (data: StockTableDataSource, filter: string) => this.customPredicate(data);

    this.dataSource.filter = " ";
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
    stocks.forEach((stock: Stock) => {
      var dataElement: StockTableDataSource = new StockTableDataSource;
      dataElement.id = stock.id;
      dataElement.name = stock.name;
      dataElement.abbreviation = stock.abbreviation;
      dataElement.currentPrice = stock.currentPrice;
      dataElement.priceDelta = stock.priceDelta;
      if (shares.find(share => share.stockId == stock.id))
        dataElement.ownedAmount = shares.find(share => share.stockId == stock.id).amount;
      tableDataSource.push(dataElement)
    })
    return tableDataSource;
  }
}
