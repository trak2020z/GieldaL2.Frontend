import { Stock } from 'src/app/_models/stock.model';

export class StockTableDataSource {
    stockId: number;
    shareId: number;
    name: string;
    abbreviation: string;
    currentPrice: number;
    priceDelta: number;
    ownedAmount: Number;
}