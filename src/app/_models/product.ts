/**
 * Define los datos de un producto
 */

import { Prices } from "./price";

export enum Type{
  JUGUETE, FRUTAS, VERDURAS, DECORACION, ROPA
}

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

  /**
   * Tipo del producto
   */
  tipo!: Type 
}
