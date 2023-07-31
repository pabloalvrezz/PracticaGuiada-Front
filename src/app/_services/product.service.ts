import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AbstractService } from '../_helpers/abstract';
import { FindRequest, Page } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends AbstractService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
   * Realza la consulta de productos
   */
  searchProducts(findRequest: FindRequest): Observable<Page<Product>> {
    // Filter params
    let parameters = new HttpParams();
    parameters = Helper.addParam(parameters, 'name', findRequest.filter.name);
    parameters = Helper.addParam(parameters, 'stock', findRequest.filter.stock);

    // Pagination params
    parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

    return this.httpClient
      .get<Page<Product>>(Helper.getUrl('/product/search'), {
        params: parameters
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Realiza la consulta de productos que no tiene asignado ningun precio
   */
  findAvaible(findRequest: FindRequest): Observable<Page<Product>> {
    return this.httpClient.get<Page<Product>>(Helper.getUrl('/product/avaibles'))
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   *Guarda los datos del producto
   *@param product el producto
   *@returns Observable con el resultado
   */
  save(product: Product): Observable<Product> {
    return this.httpClient
      .post<Product>(Helper.getUrl('/product'), product)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(product: Product): Observable<Product> {
    return this.httpClient
      .put<Product>(Helper.getUrl('/product'), product)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
    * Realiza la activación o desactivación de un producto.
    * @param product Datos del producto.
    * @returns Observable con el resultado de la operación.
    */
  toggle(product: Product): Observable<any> {
    let observable: Observable<any>;

    if (product.enabled) {
      observable = this.httpClient.put(Helper.getUrl(`/product/${product.id}/disable`), null);
    } else {
      observable = this.httpClient.put(Helper.getUrl(`/product/${product.id}/enable`), null);
    }

    return observable.pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene los datos del producto
   */
  get(id: number): Observable<Product> {

    return this.httpClient
      .get<Product>(Helper.getUrl('/product/' + id))
      .pipe(
        catchError(this.handleError)
      );
  }


}
