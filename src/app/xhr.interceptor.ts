import{Injectable} from '@angular/core' ; 
import { HttpRequest , HttpHandler, HttpInterceptor} from '@angular/common/http' ; 
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class XHrInterceptor implements HttpInterceptor{
    constructor(private cookieService : CookieService)
    {}
    intercept(req : HttpRequest<any> , next : HttpHandler)
    {// const token = this.cookieService.get('token') ; 
   // const token="MTIzNDU2Nzg6cGFzc3dvcmQy" ; 
         const token=localStorage.getItem('token') ; 
         const xhr = req.clone({
        headers : req.headers.set('authorization',`Basic ${token}`)

    }) ; 
    return next.handle(xhr) ; 
    }
}