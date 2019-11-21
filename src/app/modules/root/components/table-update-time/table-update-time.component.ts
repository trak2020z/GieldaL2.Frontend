import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'table-update-time',
  templateUrl: './table-update-time.component.html',
  styleUrls: ['./table-update-time.component.scss']
})
export class TableUpdateTimeComponent implements OnInit {
  tableUpdateTime: String;
  constructor() {
    var date = new Date();
    var minutes;
    var seconds;
    if (date.getMinutes() < 10) minutes = "0" + date.getMinutes();
    else minutes = date.getMinutes();
    if (date.getSeconds() < 10) seconds = "0" + date.getSeconds();
    else seconds = date.getSeconds();
    this.tableUpdateTime = date.getHours() + ':' + minutes + ':' + seconds;
  }

  ngOnInit() {
  }

}
