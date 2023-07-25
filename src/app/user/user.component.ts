import { Component } from '@angular/core';
import { PaginatedSearchComponent, FindRequest, Page, Order, Direction } from '../_helpers/search';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

/**
 * Componente para la búsqueda de usuarios.
 */
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent extends PaginatedSearchComponent<User> {

  constructor(router: Router,
    translate: TranslateService,
    toastr: ToastrService,
    private userService: UserService) {
    super(router, translate, toastr);
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<User>> {
    return this.userService.findUsers(findRequest);
  }

  protected removeInternal(entity: User): Observable<any> {
    return this.userService.toggle(entity);
  }

  protected getDefaultOrder(): Order {
    return {
      property: 'id',
      direction: Direction.ASC
    };
  }
}
