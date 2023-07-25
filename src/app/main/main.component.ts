import { Component } from '@angular/core';

/**
 * Componente principal. Se trata del componente padre
 * de todos componentes privados de la aplicación.
 *
 * Contiene un layout específico que incluye el menú de la aplicación.
 */
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent {

  /**
   * Indica si el menú está colapsado.
   */
  isMenuCollapsed = false;

  /**
   * Abre y cierra el menú.
   */
  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

}
