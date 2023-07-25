import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from '../_helpers/abstract';
import { FindRequest, Page } from '../_helpers/search';
import { Observable, catchError } from 'rxjs';
import { Price } from '../_models/price';
import { Helper } from '../_helpers/utils';

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
  searchPrices(findRequest: FindRequest): Observable<Page<Price>> {
    return this.httpClient
      .get<Page<Price>>(Helper.getUrl('/prices/search'))
      .pipe(catchError(this.handleError));
  }
}
