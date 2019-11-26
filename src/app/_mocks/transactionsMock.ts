import { Transaction } from '../_models/transaction';

/**
 * Mock data for app testing
 */
export const TRANSACTION: Transaction[] = [
    {id: 1, buyerId: 1, sellerId: 3, stockId: 1, amount: 16, price: 45},
    {id: 2, buyerId: 2, sellerId: 1, stockId: 2, amount: 85, price: 45},
    {id: 2, buyerId: 3, sellerId: 1, stockId: 3, amount: 235, price: 45},
    {id: 3, buyerId: 1, sellerId: 2, stockId: 2, amount: 463, price: 45},
    {id: 3, buyerId: 2, sellerId: 1, stockId: 3, amount: 2, price: 45},
    {id: 4, buyerId: 3, sellerId: 2, stockId: 1, amount: 46, price: 45},
    {id: 5, buyerId: 1, sellerId: 3, stockId: 2, amount: 9, price: 45},
    {id: 6, buyerId: 2, sellerId: 3, stockId: 3, amount: 2489, price: 45},
    {id: 6, buyerId: 2, sellerId: 3, stockId: 4, amount: 46, price: 45}
  ];