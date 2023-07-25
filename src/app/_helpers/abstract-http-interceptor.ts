import { HttpInterceptor, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
    HttpResponse, HttpRequest, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


export abstract class AbstractHttpInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): 
        Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        if (this.checkOauthURL(req.url)) {
            return this.interceptInternal(req, next);
        } else {
            return next.handle(req);
        }
    }

    protected abstract isOauth(): boolean;

    protected abstract interceptInternal(req: HttpRequest<any>, next: HttpHandler): 
        Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>>;

    private checkOauthURL(url: string): boolean {
        const isNotUrlOauth = !(url.match('^.*\/oauth\/.*$'));

        return (isNotUrlOauth && !this.isOauth()) || (!isNotUrlOauth && this.isOauth());
    }
}
