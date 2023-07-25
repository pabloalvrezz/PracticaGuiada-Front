import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AbstractService } from '../_helpers/abstract';
import { FindRequest, Page } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { User } from '../_models/user';

/**
 * Servicio para la gestión de datos de usuario.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
   * Realiza la consulta de usuarios.
   * @param findRequest Datos de la consulta.
   * @returns Observable con el resultado de la consulta.
   */
  findUsers(findRequest: FindRequest): Observable<Page<User>> {

    // Filter params
    let parameters = new HttpParams();
    parameters = Helper.addParam(parameters, 'name', findRequest.filter.name);
    parameters = Helper.addParam(parameters, 'email', findRequest.filter.email);
    parameters = Helper.addParam(parameters, 'enabled', findRequest.filter.enabled);

    // Pagination params
    parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);


    console.log("Usuarios")
    console.log(findRequest.pageRequest.size)

    return this.httpClient
      .get<Page<User>>(Helper.getUrl('/user/search'), {
        params: parameters
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtiene los datos de un usuario.
   * @param id ID del usuario.
   * @returns Observable con los datos del usuario.
   */
  get(id: string): Observable<User> {
    return this.httpClient
      .get<User>(Helper.getUrl('/user/' + id))
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Realiza el guardado de los datos de un usuario.
   * @param user Usuario a guardar.
   * @returns Observable con el resultado de la operación.
   */
  save(user: User): Observable<User> {
    return this.httpClient
      .post<User>(Helper.getUrl('/user'), user)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Realiza la actualización de los datos de un usuario.
   * @param user Usuario a guardar.
   * @returns Observable con el resultado de la operación.
   */
  update(user: User): Observable<User> {
    return this.httpClient
      .put<User>(Helper.getUrl('/user'), user)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Realiza la activación o desactivación de un usuario.
   * @param user Datos del usuario.
   * @returns Observable con el resultado de la operación.
   */
  toggle(user: User): Observable<any> {
    let observable: Observable<any>;

    if (user.accountNonLocked) {
      observable = this.httpClient.put(Helper.getUrl(`/user/${user.id}/disable`), null);
    } else {
      observable = this.httpClient.put(Helper.getUrl(`/user/${user.id}/enable`), null);
    }

    return observable.pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene los datos del usuario actual
   * @returns Observable con los datos del usuario actual.
   */
  getUserData(): Observable<User> {
    return this.httpClient
      .get<User>(Helper.getUrl('/user'))
      .pipe(
        catchError(this.handleError)
      );
  }
}
