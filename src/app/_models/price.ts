import { Product } from "./product";

export class Prices {

  id!: number;

  startDate!: Date;

  endDate!: Date;

  cuantity!: number;

  product?: Product;
}
