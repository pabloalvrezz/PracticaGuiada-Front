import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Helper } from '../_helpers/utils';
import { AbstractService } from '../_helpers/abstract';

@Injectable({ providedIn: 'root' })
export class RegisterService extends AbstractService {
  constructor(private http: HttpClient) {
    super();
  }
  /**
   * Realiza el registro del usuario
   * @param uuser el usuario
   * @returns Observable con el usuario registrado
   */
  register(user: User): Observable<User> {
    // establecemos los valores del bloqueo de cuenta a verdadero para que el usuario este activado
    user.accountNonExpired = true;
    user.accountNonLocked = true;
    user.enabled = true;
    user.credentialsNonExpired = true;

    // Definimos el array de roles y a los usuarios que se registran por defecto
    // se les añade USER
    user.roles = []
    user.roles.push('USER')
    return this.http
      .post<User>(Helper.getUrl('/user'), user)
      .pipe(catchError(this.handleError));
  }
}
