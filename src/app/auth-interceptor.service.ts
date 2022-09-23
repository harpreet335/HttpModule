import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, pipe } from "rxjs";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log('Request leaving the app');
        const modifiedReq = req.clone({headers: req.headers.append("Auth","abc123456xyz")});
         return next.handle(modifiedReq);
        //.pipe(
        //     tap((event)=>{
        //         console.log(event);
        //         if(event.type === HttpEventType.Response)
        //         {
        //             console.log("Response received from the BE..");
        //             console.log(event.body);
        //         }
        // }));
    }
}