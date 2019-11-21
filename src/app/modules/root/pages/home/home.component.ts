import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/_models/stock.model';
import { StockService } from 'src/app/_services/stock.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {
  dataSource: Stock[];
  displayedColumns: string[] = ['name', 'abbreviation', 'currentPrice', 'priceDelta'];
  refreshTime: String;

  constructor(private stockService: StockService) { 
    var d = new Date();
    this.refreshTime = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  ngOnInit() {
    this.getStocks();
    this.dataSource.sort(this.compare);
  }

  private compare(a:Stock, b:Stock) {
    if (a.currentPrice > b.currentPrice) return -1;
    if (a.currentPrice = b.currentPrice) return 0;
    if (a.currentPrice < b.currentPrice) return 1;
  }

  getStocks(): void {
    this.stockService.getStocks()
      .subscribe(stocks => this.dataSource = stocks);
  }
}
