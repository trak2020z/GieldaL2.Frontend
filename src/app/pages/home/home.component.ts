import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/_models/stock.model';

import { STOCK } from 'src/app/_mocks/stockMock'

import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {
  dataSource: Stock[] = STOCK;
  displayedColumns: string[] = ['name', 'value', 'change'];
  refreshTime: String;

  constructor() { 
    var d = new Date();
    this.refreshTime = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

    this.dataSource.sort(this.compare);
    this.dataSource.reverse();
  }

  ngOnInit() {
    
  }

  private compare(a:Stock, b:Stock) {
    if (a.value > b.value) return 1;
    if (a.value = b.value) return 0;
    if (a.value < b.value) return 11;
  }
}
