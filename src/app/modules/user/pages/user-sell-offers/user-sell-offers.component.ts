import { Component, OnInit } from '@angular/core';
import { SaleOffer } from 'src/app/_models/saleOffer.model';
import { ShareService } from 'src/app/_services/share.service';
import { UserSaleDataElement } from './userSaleDataElement';
import { StockService } from 'src/app/_services/stock.service';
import { forkJoin, Observable } from 'rxjs';
import { Stock } from 'src/app/_models/stock.model';
import { ApiResponse } from 'src/app/_models/apiResponse';
import { ContextService } from 'src/app/_services/context.service';
import { MatTableDataSource } from '@angular/material';
import { Share } from 'src/app/_models/share.model';
import { OffersService } from 'src/app/_services/offer.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-sell-offers',
  templateUrl: './user-sell-offers.component.html',
  styleUrls: ['./user-sell-offers.component.scss']
})
export class UserSellOffersComponent implements OnInit {

 /**
  * Displayed column by mat-table
  */
 displayedColumns: string[] = ['stockName', 'amount', 'price', 'finalPrice', 'actions'];
 /**
  * Stores data displayed by table
  */
 dataSource;

 loggedUserId;

  serviceStatus: string;

  dialogData: string;

  /**
  * Default constructor defining services
  * 
  * @param contextService
  * @param stockService
  * @param shareService
  * @param offersService
  * @param snackBar
  * @param dialog
  */
  constructor(
    private contextService: ContextService,
    private stockService: StockService,
    private shareService: ShareService,
    private offersService: OffersService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.serviceStatus = 'OK';
    this.getTableData();
  }

  getTableData(): void {
    this.serviceStatus = 'loading';
    forkJoin([
      // this.tansactionService.getTransactions(),
      this.stockService.getStocks(),
      this.shareService.getShares(),
      this.contextService.getContext()
    ]).subscribe(([stocks, shares, context]: [ApiResponse, ApiResponse, ApiResponse]) => {
      this.loggedUserId = context.data.user.id;
      const saleOffers = context.data.sellOffers;
      this.dataSource = new MatTableDataSource(this.mapSaleOffers(saleOffers, stocks.data, shares.data));
      this.serviceStatus = 'OK';
    },
      error => {
        this.serviceStatus = 'error';
      });
  }

  /**
   * Map sale offers to match table row
   * @param userSaleOffers user sale offers to map
   * @param stocks stock list
   * @param shares share list
   */
  mapSaleOffers(userSaleOffers: SaleOffer[], stocks: Stock[], shares: Share[]): UserSaleDataElement[] {
    const tableDataSource: UserSaleDataElement[] = []

    userSaleOffers.forEach((saleOffer: SaleOffer) => {
      const dataElement: UserSaleDataElement = new UserSaleDataElement();

      const shareForOffer = shares.find(share => share.id === saleOffer.shareId);
      dataElement.id = saleOffer.id;
      dataElement.stockName = stocks.find(stock => stock.id === shareForOffer.stockId).name;
      dataElement.amount = saleOffer.amount;
      dataElement.price = saleOffer.price;
      dataElement.finalPrice = saleOffer.amount.valueOf() * saleOffer.price.valueOf();

      tableDataSource.push(dataElement);
    });
    return tableDataSource;
  }

  /**
   * Delete sale offer with given id
   * @param id id of sale offer to delete
   */
  deleteOffer( id: number): void {
    this.openDialog().subscribe(confirmResult => {
      if (confirmResult) {
        this.serviceStatus = 'loading';
        this.offersService.deleteSellOffer(id).subscribe(response => {
          this.serviceStatus = 'OK';
          if (response) {
            this.snackBar.open('Sale offer deleted successfully', 'Close', {
              duration: 2000,
            });
          } else {
            this.snackBar.open('An error occurred while deleteting offer', 'Close', {
              duration: 2000,
            });
          }

          this.getTableData();
          },
          error => {
            this.serviceStatus = 'error';
          });
      }
    });
  }
/**
   * Open confirm dialog
   */
  openDialog(): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: 'Are you sure you want to delete this sale offer?'
    });
    const observable = new Observable(observer => {
      dialogRef.afterClosed().subscribe(confirmResult => {
        observer.next(confirmResult);
        observer.complete();
        });
    });
    return observable;
  }
}
