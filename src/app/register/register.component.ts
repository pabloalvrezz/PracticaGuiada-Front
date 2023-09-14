import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { RegisterService } from '../_services/register.service';

@Component({
  selector: 'selector-name',
  templateUrl: 'register.component.html',
})
export class RegisterComponent implements OnInit {
  /**
   * Datos del usuario que se acaba de registrar
   */
  user: User = new User();

  constructor(
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private translate: TranslateService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.user.username = '';
    this.user.email = '';
    this.user.password = '';
    this.registerService.register(this.user).subscribe(usuario => {
      this.user = usuario
    })
  }

  /**
   * Realiza el registro del usuario
   */
  register() {
    let observable: Observable<User>
    observable = this.registerService.register(this.user)

    observable.subscribe({
      next: (user: User) => {
        this.router.navigate(['/login'])
        this.toastr.success(
          this.translate.instant(
            'toast.success-saving',
            this.translate.instant('toast.success')
          )
        );
      }
    }
    )
  }
}
