import { Component, OnInit, ViewChild } from '@angular/core';
import { Stock } from 'src/app/_models/stock.model';
import { StockService } from 'src/app/_services/stock.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';

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
  * Stores Stock (data)
  */
  stocks: Stock[];
  /**
   * Provided by Angular Material holds Stocks array for table
   */
  dataSource;
  /**
  * Displayed column by mat-table  
  */
  displayedColumns: string[] = ['name', 'value', 'change'];

  /**
   * Parameter for predicate stock name
   */
  filterName: string;
  /**
   * Parameter for predicate max stock price
   */
  filterMaxValue: number;
  /**
   * Parameter for predicate min stock price
   */
  filterMinValue: number;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  /**
  * Defines a private stockService property and identifies it as a StockService injection site.
  * 
  * @param stockService 
  */
  constructor(private stockService: StockService) {}

   /**
   * Actualize dataSource and sorts it every time page is refreshed
   */
  ngOnInit() {
    this.getStocks();
    this.dataSource = new MatTableDataSource(this.stocks);
    this.dataSource.sort = this.sort;
  }

  /**
   * Subscribe stockServie to aquire Stock data
   */
  getStocks(): void {
    this.stockService.getStocks()
      .subscribe(stocks => this.stocks = stocks);
  }

  /**
   * Prediate for data filtering
   * 
   * @param (Stock) data input data for preficate
   * @returns (boolean) true if Stack fulfil predicate otherwise false
   */
  customPredicate(data: Stock): boolean{
    return (!this.filterMaxValue || data.value <= this.filterMaxValue) 
      && (!this.filterMinValue || data.value >= this.filterMinValue)
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
    this.filterMaxValue = filterValue;
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
    this.filterMinValue = filterValue;
    this.dataSource.filterPredicate = 
    (data: Stock, filter: string) => this.customPredicate(data);

    this.dataSource.filter = " ";
  }
}
