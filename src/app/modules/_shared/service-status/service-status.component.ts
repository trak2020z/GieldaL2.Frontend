import { Component, OnInit, Input } from '@angular/core';

/**
 * Crate service status indicator
 */
@Component({
  selector: 'app-service-status',
  templateUrl: './service-status.component.html',
  styleUrls: ['./service-status.component.scss']
})

export class ServiceStatusComponent implements OnInit {
  /**
   * 'loading' - waiting for data
   * 'error' - application couldn't download data
   */
  @Input() serviceStatus: string;

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() {
  }

}
