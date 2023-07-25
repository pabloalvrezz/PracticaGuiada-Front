import { HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, 
    HttpResponse, HttpRequest, HttpUserEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { OAUTH } from '../configuration';
import { Base64 } from 'js-base64';
import { AbstractHttpInterceptor } from '../_helpers/abstract-http-interceptor';

import { catchError } from 'rxjs/operators';

@Injectable()
export class OAuthInterceptor extends AbstractHttpInterceptor {
    
    protected isOauth(): boolean {
        return true;
    }

    protected interceptInternal(req: HttpRequest<any>, next: HttpHandler): 
        Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: 'Basic ' + Base64.encode(`${OAUTH.clientId}:${OAUTH.secret}`),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return next.handle(req).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: Response) {
        console.log(error);
        return throwError(() => error);
    }
}
