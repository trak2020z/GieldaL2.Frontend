import { Component, OnInit, ViewChild } from '@angular/core';
import { Stock } from 'src/app/_models/stock.model';
import { StockService } from 'src/app/_services/stock.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  stocks: Stock[];
  dataSource;
  displayedColumns: string[] = ['name', 'value', 'change'];

  filterName: string;
  filterMaxValue: number;
  filterMinValue: number;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private stockService: StockService) {

   }

  ngOnInit() {
    this.getStocks();

    this.dataSource = new MatTableDataSource(this.stocks);
    this.dataSource.sort = this.sort;
  }


  getStocks(): void {
    this.stockService.getStocks()
      .subscribe(stocks => this.stocks = stocks);
  }

  customPredicate(data: Stock): boolean{
    return (!this.filterMaxValue || data.value <= this.filterMaxValue) 
      && (!this.filterMinValue || data.value >= this.filterMinValue)
      && (!this.filterName || data.name.trim().toLowerCase().includes(this.filterName))
  }

  applyFilterName(filterValue: string) {
    this.filterName = filterValue.trim().toLowerCase()
    this.dataSource.filterPredicate = 
    (data: Stock, filter: string) => this.customPredicate(data);

    this.dataSource.filter = " ";
  }

  applyFilterMaxValue(filterValue: number) {
    this.filterMaxValue = filterValue;
    this.dataSource.filterPredicate = 
    (data: Stock, filter: string) => this.customPredicate(data);

    this.dataSource.filter = " ";
  }

  applyFilterMinValue(filterValue: number) {
    this.filterMinValue = filterValue;
    this.dataSource.filterPredicate = 
    (data: Stock, filter: string) => this.customPredicate(data);

    this.dataSource.filter = " ";
  }
}
