/**
 * Title: models/invoice.model.ts
 * Author: Nathaniel Liebhart
 * Desription: bcrs
 */
import { LineItem } from './line-item.model';

export interface Invoice {
  _id: string;
  lineItems: LineItem[];
  partsAmount: number;
  laborAmount: number;
  lineItemTotal: number;
  total: number;
  username: string;
  orderDate: Date;
}
