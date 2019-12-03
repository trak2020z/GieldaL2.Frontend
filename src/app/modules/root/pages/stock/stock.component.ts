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
import { TableDataSource } from './tableDataSource';
import { Share } from 'src/app/_models/share.model';
import { share } from 'rxjs/operators';

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

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /**
  * Defines a private stockService property and identifies it as a StockService injection site.
  * 
  * @param stockService 
  */
  constructor(
    private stockService: StockService,
    private tokenStorage: TokenStorage,
    private contextService: ContextService
  ) { }


  /**
   * @ignore
   */
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.displayedColumns.push("buttons")
      this.getDataWithLoggedUser();
    }
    else this.getData();

  }

  /**
   * Subscribe stockServie to aquire Stock data
   */
  getDataWithLoggedUser(): void {
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

  getData(): void {
          this.stockService.getStocks().subscribe((s:ApiResponse) => {
      this.dataSource = new MatTableDataSource(this.createDataSource(s.data, null));
      this.dataSource.sort = this.sort;
    });
  }

  /**
   * Prediate for data filtering
   * 
   * @param (Stock) data input data for preficate
   * @returns (boolean) true if Stack fulfil predicate otherwise false
   */
  customPredicate(data: TableDataSource): boolean {
    return (!this.filterMaxCurrentPrice || data.stock.currentPrice <= this.filterMaxCurrentPrice)
      && (!this.filterMinCurrentPrice || data.stock.currentPrice >= this.filterMinCurrentPrice)
      && (!this.filterName || data.stock.name.trim().toLowerCase().includes(this.filterName))
  }

  /**
   * Setup filterName. And and filter data by customPredicate.
   * 
   * @param filterValue (String) falue passed by input field
   */
  applyFilterName(filterValue: string) {
    this.filterName = filterValue.trim().toLowerCase()
    this.dataSource.filterPredicate =
      (data: TableDataSource, filter: string) => this.customPredicate(data);

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
      (data: TableDataSource, filter: string) => this.customPredicate(data);

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
      (data: TableDataSource, filter: string) => this.customPredicate(data);

    this.dataSource.filter = " ";
  }

  createDataSource(stocks:Stock[], shares:Share[]): TableDataSource[]{
    var tableDataSource: TableDataSource[] = [];
      stocks.forEach((stock:Stock) => {
        var dataElement: TableDataSource = new TableDataSource;
        dataElement.stock = stock;
        if(shares.find(share => share.stockId == stock.id))
          dataElement.ownedAmount = shares.find(share => share.stockId == stock.id).amount;
        
        tableDataSource.push(dataElement)
      })
    return tableDataSource;
  }
}
