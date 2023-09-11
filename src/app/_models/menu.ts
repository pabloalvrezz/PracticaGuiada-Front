/**
 * Definición de un Item del menú.
 */
export class MenuItem {
  /**
   * Título del menú.
   */
  title: string;
  /**
   * Icono.
   */
  icon: string;
  /**
   * URL.
   */
  url: string;

  constructor(title: string, icon: string, url: string) {
    this.title = title;
    this.icon = icon;
    this.url = url;
  }
}

/**
 * Definición de los Items de menú
 */
export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'menu.home',
    icon: 'ion-home',
    url: '/main/home'
  },

  {
    title: 'menu.products',
    icon: '',
    url: '/main/product'
  },

  {
    title: 'menu.prices',
    icon: '',
    url: '/main/prices'
  },

  {
    title: 'menu.users',
    icon: '',
    url: '/main/users'
  },

  

];
