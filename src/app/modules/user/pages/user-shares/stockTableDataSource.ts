import { Stock } from 'src/app/_models/stock.model';
/**
 * Used by user share view to show data in table 
 */
export class StockTableDataSource {
    stockId: number;
    shareId: number;
    name: string;
    abbreviation: string;
    currentPrice: number;
    priceDelta: number;
    ownedAmount: Number;
}