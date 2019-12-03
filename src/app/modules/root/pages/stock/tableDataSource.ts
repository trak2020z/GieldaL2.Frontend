import { Stock } from 'src/app/_models/stock.model';

export class TableDataSource {
    id: number;
    name: string;
    abbreviation: string;
    currentPrice: number;
    priceDelta: number;
    ownedAmount: Number;
}