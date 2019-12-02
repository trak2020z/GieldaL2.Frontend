import { Component, OnInit, ViewChild } from '@angular/core';
import { Stock } from 'src/app/_models/stock.model';
import { StockService } from 'src/app/_services/stock.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { ApiResponse } from 'src/app/_models/apiResponse';
import { STOCK } from 'src/app/_mocks/stockMock';

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

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /**
  * Defines a private stockService property and identifies it as a StockService injection site.
  * 
  * @param stockService 
  */
  constructor(private stockService: StockService) {
    this.getStocks();
  }

  /**
   * @ignore
   */
  ngOnInit() {

  }

  /**
   * Subscribe stockServie to aquire Stock data
   */
  getStocks(): void {
    this.stockService.getStocks()
      .subscribe((r: ApiResponse) => {
      this.dataSource = new MatTableDataSource(r.data);
        this.dataSource.sort = this.sort;
      });
  }

  /**
   * Prediate for data filtering
   * 
   * @param (Stock) data input data for preficate
   * @returns (boolean) true if Stack fulfil predicate otherwise false
   */
  customPredicate(data: Stock): boolean {
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
      (data: Stock, filter: string) => this.customPredicate(data);

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
      (data: Stock, filter: string) => this.customPredicate(data);

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
      (data: Stock, filter: string) => this.customPredicate(data);

    this.dataSource.filter = " ";
  }
}
