import { TestBed } from '@angular/core/testing';

// -------------- Modules --------------
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { NgSelectModule } from '@ng-select/ng-select';

// -------------- Services --------------
import { LoginService } from '../_services/login.service'; 
import { MenuService } from '../_services/menu.service';
import { UserService } from '../_services/user.service';

// -------------- Components --------------
import { LoginComponent } from '../login/login.component';
import { UserComponent } from '../user/user.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { MainComponent } from '../main/main.component';
import { MenuComponent } from '../menu/menu.component';
import { HomeComponent } from '../home/home.component';
import { PaginationComponent } from '../pagination/pagination.component';

// -------------- Guards --------------
import { AuthGuard } from '../_guards/auth.guard';

// -------------- Interceptors --------------
import { TokenizedInterceptor } from '../_interceptors/tokenized-interceptor';
import { OAuthInterceptor } from '../_interceptors/oauth-interceptor';

import { APP_BASE_HREF } from '@angular/common';

/**
 * Clase de ayuda para construcción de tests unitarios.
 */
export class TestingHelper {
    public static configureTest(): typeof TestBed {
        return TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
                UserComponent,
                UserDetailComponent,
                MainComponent,
                MenuComponent,
                HomeComponent,
                PaginationComponent
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
                    useFactory: (this.createTranslateLoader),
                    deps: [HttpClient]
                }
                }),
                ToastrModule.forRoot(),
                PaginationModule.forRoot(),
                NgProgressModule,
                NgProgressHttpModule,
                NgProgressRouterModule,
                NgSelectModule
            ],
            providers: [
                AuthGuard,
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
                },
                {
                    provide: APP_BASE_HREF, 
                    useValue : '/' 
                }
            ]
        });
    }

    private static createTranslateLoader(httpClient: HttpClient) {
        return new TranslateHttpLoader(httpClient, '../assets/i18n/', '.json');
    }
}
