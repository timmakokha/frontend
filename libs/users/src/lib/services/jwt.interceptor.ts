import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocalStorageService} from "./localStorage.service";
import {environment} from "@env/environment";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localstorageToken: LocalStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localstorageToken.getToken()
    const isApiUrl = req.url.startsWith(environment.appUrl)
    if(token && isApiUrl){
      req = req.clone(
        {
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    }
    return next.handle(req);
  }

}
