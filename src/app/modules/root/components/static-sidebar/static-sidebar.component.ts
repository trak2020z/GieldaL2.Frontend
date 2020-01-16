import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-static-sidebar',
  templateUrl: './static-sidebar.component.html',
  styleUrls: ['./static-sidebar.component.scss']
})
export class StaticSidebarComponent implements OnInit {
  /**
   * Storage for current date
   */
  currentDate: number = Date.now();

  /**
   * Refreshes current date and time
   */
  constructor() {
    setInterval(() => { this.currentDate = Date.now(); }, 1);
  }

  /**
   * @ignore
   */
  ngOnInit() {
  }

}
