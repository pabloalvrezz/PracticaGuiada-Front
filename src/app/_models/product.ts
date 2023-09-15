/**
 * Define los datos de un producto
 */

import { Prices } from "./price";
import { User } from "./user";

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

  /**
   * Usuarios que tienen el producto como favorito
   */
  users!: User

  /**
   * Variable que controla si el producto es favorito del usuario
   * actual o no
   */
  isFav!: boolean
}
