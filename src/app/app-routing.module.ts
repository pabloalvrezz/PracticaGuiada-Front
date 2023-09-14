import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './_guards/auth.guard';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { PricesComponent } from './prices/prices.component';
import { PricesDetailsComponent } from './prices-details/prices-details.component';
import { SearcherComponent } from './searcher/searcher.component';
import { SearcherDetailsComponent } from './searcher_details/searcher-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { EnabledGuard } from './_guards/enabled.guard';
import { RegisterComponent } from './register/register.component';

/**
 * Rutas securizadas
 */
const secureRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },

  /**
   * Consulta de usuarios
   */
  {
    path: 'users',
    component: UserComponent,
  },

  /**
   * Creación de usuarios.
   */
  {
    path: 'users/create',
    component: UserDetailComponent,
  },

  /**
   * Detalle de usuarios.
   */
  {
    path: 'users/:id',
    component: UserDetailComponent,
  },

  /**
   * Consulta de productos
   */
  {
    path: 'product',
    component: ProductsComponent,
  },

  /**
   *Creacion de los productos
   */
  {
    path: 'product/create',
    component: ProductsDetailsComponent,
  },

  /**
   * Detalle de productos.
   */
  {
    path: 'product/:id',
    component: ProductsDetailsComponent,
  },

  /**
   * Consulta de precios
   */
  {
    path: 'prices',
    component: PricesComponent,
  },

  /**
   *Creacion de los precios
   */
  {
    path: 'prices/create',
    component: PricesDetailsComponent,
  },

  /**
   * Detalles de los precios
   */
  {
    path: 'prices/:id',
    component: PricesDetailsComponent,
  },
];

const routes: Routes = [
  /**
   * Login
   */
  {
    path: 'login',
    component: LoginComponent,
  },

  /**
   * Register
   */
  {
    path: 'register',
    component: RegisterComponent
  },

  /**
   * Ruta main securizada.
   */
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: secureRoutes,
  },

  /**
   * Buscador de productos
   */
  {
    path: 'search',
    component: SearcherComponent,
  },

  /**
   * Detalle de los productos en el buscador
   */
  {
    path: 'product/search/details/:id',
    component: SearcherDetailsComponent,
     canActivate: [EnabledGuard]
  },

  // // otherwhise redirect to main
  {
    path: '**',
    redirectTo: 'search',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, TranslateModule],
})
export class AppRoutingModule {}
