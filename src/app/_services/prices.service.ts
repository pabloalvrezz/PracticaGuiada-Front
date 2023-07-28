import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from '../_helpers/abstract';
import { FindRequest, Page } from '../_helpers/search';
import { Observable, catchError } from 'rxjs';
import { Prices } from '../_models/price';
import { Helper } from '../_helpers/utils';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class PricesService extends AbstractService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
   * Metodo que se encargar de realizar la consulta de los precios
   */
  searchPrices(findRequest: FindRequest): Observable<Page<Prices>> {
    return this.httpClient
      .get<Page<Prices>>(Helper.getUrl('/prices/search'))
      .pipe(catchError(this.handleError));
  }

  /**
   * Guarda los datos del precio actual
   *
   * @param precio
   *
   * @returns observable con el resultado de la operacion
   */
  save(price: Prices): Observable<Prices> {
    return this.httpClient
      .post<Prices>(Helper.getUrl('/prices/') + price.product?.id, price)
      .pipe(
        catchError(this.handleError)
      )
  }

  /**
   * Realiza la actualizacion del precio
   */
  update(price: Prices): Observable<Prices> {

    return this.httpClient
      .put<Prices>(Helper.getUrl('/prices'), price)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtiene los datos del precio
   *
   * @param id
   */
  get(id: number): Observable<Prices> {
    return this.httpClient
      .get<Prices>(Helper.getUrl('/prices/' + id))
      .pipe(
        catchError(this.handleError)
      )
  }

}
