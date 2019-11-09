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
  displayedColumns: string[] = ['name', 'value', 'change'];
  refreshTime: String;

  constructor(private stockService: StockService) { 
    var d = new Date();
    this.refreshTime = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  ngOnInit() {
    this.getStocks();
    this.dataSource.sort(this.compare);
    this.dataSource.reverse();
  }

  private compare(a:Stock, b:Stock) {
    if (a.value > b.value) return 1;
    if (a.value = b.value) return 0;
    if (a.value < b.value) return 11;
  }

  getStocks(): void {
    this.dataSource = this.stockService.getStocks();
    
    //this.stockService.getStocks()
   // .subscribe(stock => this.dataSource = stock);
  }
}
