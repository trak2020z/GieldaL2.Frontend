import {Component, OnInit} from '@angular/core';
import {ContextService} from '../../../../_services/context.service';
import {StockService} from '../../../../_services/stock.service';
import {ShareService} from '../../../../_services/share.service';
import {OffersService} from '../../../../_services/offer.service';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {forkJoin, Observable} from 'rxjs';
import {ApiResponse} from '../../../../_models/apiResponse';
import {Stock} from '../../../../_models/stock.model';
import {Share} from '../../../../_models/share.model';
import {UserSaleDataElement} from '../user-sell-offers/userSaleDataElement';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {BuyOffer} from '../../../../_models/buyOffer.model';

@Component({
  selector: 'app-user-buy-offers',
  templateUrl: './user-buy-offers.component.html',
  styleUrls: ['./user-buy-offers.component.scss']
})
export class UserBuyOffersComponent implements OnInit {

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
  constructor(private contextService: ContextService,
              private stockService: StockService,
              private shareService: ShareService,
              private offersService: OffersService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.serviceStatus = 'OK';
    this.getTableData();
  }

  getTableData(): void {
    this.serviceStatus = 'loading';
    forkJoin([
      this.stockService.getStocks(),
      this.shareService.getShares(),
      this.contextService.getContext()
    ]).subscribe(([stocks, shares, context]: [ApiResponse, ApiResponse, ApiResponse]) => {
        this.loggedUserId = context.data.user.id;
        const buyOffers = context.data.buyOffers;
        this.dataSource = new MatTableDataSource(this.mapBuyOffers(buyOffers, stocks.data, shares.data));
        this.serviceStatus = 'OK';
      },
      error => {
        this.serviceStatus = 'error';
      });
  }

  /**
   * Map offers to match table row
   * @param userBuyOffers
   * @param stocks
   * @param shares
   */
  mapBuyOffers(userBuyOffers: BuyOffer[], stocks: Stock[], shares: Share[]): UserSaleDataElement[] {
    const tableDataSource: UserSaleDataElement[] = [];

    userBuyOffers.forEach((buyOffer: BuyOffer) => {
      const dataElement: UserSaleDataElement = new UserSaleDataElement();

      dataElement.id = buyOffer.id;
      dataElement.stockName = stocks.find(stock => stock.id === buyOffer.stockId).name;
      dataElement.amount = buyOffer.amount;
      dataElement.price = buyOffer.price;
      dataElement.finalPrice = buyOffer.amount.valueOf() * buyOffer.price.valueOf();

      tableDataSource.push(dataElement);
    });
    return tableDataSource;
  }

  /**
   * Delete sale offer with given id
   * @param id id of sale offer to delete
   */
  deleteOffer(id: number): void {
    this.openDialog().subscribe(confirmResult => {
      if (confirmResult) {
        this.serviceStatus = 'loading';
        this.offersService.deleteBuyOffer(id).subscribe(response => {
            this.serviceStatus = 'OK';
            if (response) {
              this.snackBar.open('Buy offer deleted successfully', 'Close', {
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
