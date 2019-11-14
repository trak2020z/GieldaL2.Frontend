import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-static-sidebar',
  templateUrl: './static-sidebar.component.html',
  styleUrls: ['./static-sidebar.component.scss']
})
export class StaticSidebarComponent implements OnInit {
  currentDate: number = Date.now();

  constructor() {
    setInterval(() => { this.currentDate = Date.now(); }, 1);
  }

  ngOnInit() {
  }

}
