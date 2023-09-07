// -------------- Modules --------------
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrModule } from 'ngx-toastr';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// -------------- Services --------------
import { LoginService } from './_services/login.service';
import { MenuService } from './_services/menu.service';
import { UserService } from './_services/user.service';

// -------------- Components --------------
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { PaginationComponent } from './pagination/pagination.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PricesComponent } from './prices/prices.component';
import { PricesDetailsComponent } from './prices-details/prices-details.component';
import { SearcherComponent } from './searcher/searcher.component'

// -------------- Guards --------------
// import { AuthGuard } from './_guards/auth.guard';

// -------------- Interceptors --------------
import { OAuthInterceptor } from './_interceptors/oauth-interceptor';
import { ProductsComponent } from './products/products.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { TokenizedInterceptor } from './_interceptors/tokenized-interceptor';
import { SearcherDetailsComponent } from './searcher_details/searcher-details.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    UserDetailComponent,
    MainComponent,
    MenuComponent,
    HomeComponent,
    PaginationComponent,
    ProductsComponent,
    ProductsDetailsComponent,
    PricesComponent,
    PricesDetailsComponent,
    SearcherComponent,
    SearcherDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
    PaginationModule.forRoot(),
    NgProgressModule,
    NgProgressHttpModule,
    NgProgressRouterModule,
    NgSelectModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  providers: [
    // AuthGuard,
    LoginService,
    MenuService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenizedInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
