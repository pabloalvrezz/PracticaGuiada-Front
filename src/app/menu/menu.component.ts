import { Component, OnInit } from '@angular/core';
import { MenuService } from '../_services/menu.service';
import { MenuItem } from '../_models/menu';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';

/**
 * Componente que muestra el menú de la aplicación.
 */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  /**
   * Items del menú de la aplicación.
   */
  menuItems!: MenuItem[];

  constructor(private router: Router, private menuService: MenuService, private loginService: LoginService) { }

  ngOnInit() {
    this.menuService.getMenu()
      .then((menuItems: MenuItem[]) => {
        this.menuItems = menuItems;
      });
  }

  /**
   * Devuelve al usuario al buscador de
   */
  logout() {
    this.router.navigate(['/search']);
  }

}
