/**
 * Define los datos de un producto
 */

import { Prices } from "./price";

export class Product {
  /**
   * Id del producto
   */
  id!: number;

  /**
   *
   */
  name!: string;

  /**
   * Descripcion del producto
   */
  description!: string;

  /**
   *Disponibilidad del producto
   */
  enabled!: boolean;

  /**
   * Stock del producto
   */
  stock!: number;

  /**
   * Objeto de tipo precio
   */
  prices?: Prices
}
