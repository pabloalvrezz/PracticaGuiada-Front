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
   * Precio actual del producto
   */
  activePrice!: number

  /**
   * Url de la imagen del producto
   */
  url!: string;
}
