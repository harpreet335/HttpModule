import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class LoggingInterceptorService implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Request leaving App !!");
        console.log("Request Headers :", req.headers);
        return next.handle(req).pipe(
            tap(event=>{
                if(event.type === HttpEventType.Response)
                {
                    console.log("Response came from BE..")
                    console.log(event.body);
                }
            })
        )
    }
}