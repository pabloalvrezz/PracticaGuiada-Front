import { Injectable } from '@angular/core';
import { MenuItem, MENU_ITEMS } from '../_models/menu';

/**
 * Servicio para gestionar el menú de la aplicación.
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  /**
   * Obtiene los datos del menú de la aplicación.
   * @returns Promesa con los datos del menú.
   */
  getMenu(): Promise<MenuItem[]> {
    return Promise.resolve(MENU_ITEMS);
  }
}

