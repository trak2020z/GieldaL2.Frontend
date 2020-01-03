import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/_models/stock.model';
import { StockService } from 'src/app/_services/stock.service';
import { ApiResponse } from 'src/app/_models/apiResponse';

/**
 * The home component
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  /**
   * Stores Stock (data)
   */
  dataSource: Stock[];
  /**
   * Displayed column by mat-table  
   */
  displayedColumns: string[] = ['name', 'abbreviation', 'currentPrice', 'priceDelta'];

  serviceStatus: string;

  /**
   * Defines a private stockService property and identifies it as a StockService injection site.
   * 
   * @param stockService 
   */
  constructor(private stockService: StockService) {
    this.getStocks();
  }


  /**
   * Actualize dataSource and sorts it every time page is refreshed
   */
  ngOnInit() {
    //this.getStocks();
    //this.dataSource.sort(this.compare);
  }

  /**
  * Comparator for Stock objects. Compare them by value
  * 
  * @param {Stock} a first Stock object
  * @param {Stock} b second Stock object
  * @returns comparator value:
  */
  private compare(a: Stock, b: Stock) {
    if (a.currentPrice > b.currentPrice) return -1;
    if (a.currentPrice = b.currentPrice) return 0;
    if (a.currentPrice < b.currentPrice) return 1;
  }

  /**
   * Subscribe stockServie to aquire Stock data
   */
  getStocks(): void {
    this.serviceStatus = 'loading'
    this.stockService.getStocks()
      .subscribe((r: ApiResponse) => {
        this.dataSource = r.data.slice(0, 9);
        this.serviceStatus = 'OK'
      },
        error => {
          this.serviceStatus = 'error'
        });
  }
}
