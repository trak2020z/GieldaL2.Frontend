import { Stock } from '../_models/stock.model';
/**
 * Mock data for app testing
 */
export const STOCK: Stock[] = [
    {id: 1, name: 'name1', abbreviation: 'n1', currentPrice: 1.0079, priceDelta: -1},
    {id: 2, name: 'name2', abbreviation: 'n2', currentPrice: 4.0026, priceDelta: 2.4},
    {id: 2, name: 'eman2', abbreviation: 'e1', currentPrice: 4.0026, priceDelta: 2.4},
    {id: 3, name: 'name3', abbreviation: 'n3', currentPrice: 6.941, priceDelta: -3},
    {id: 3, name: 'eman3', abbreviation: 'e3', currentPrice: 6.941, priceDelta: -3},
    {id: 4, name: 'name4', abbreviation: 'n4', currentPrice: 234, priceDelta: 0},
    {id: 5, name: 'name5', abbreviation: 'n5', currentPrice: 234, priceDelta: -3},
    {id: 6, name: 'name6', abbreviation: 'n6', currentPrice: 1, priceDelta: -2.34}
  ];