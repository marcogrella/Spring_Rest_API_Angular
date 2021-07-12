import { HttpErrorResponse, HttpResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';

/* Basicamente toda a requisição que for feita o header deverá ser chamado para colocar o token */

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(localStorage.getItem('token') !== null){

      /* a validação do token no backend utiliza o 'Bearer + token' */
      const token = 'Bearer ' + localStorage.getItem('token');

      /* devemos então sobreescrever no request o token. O req.clone() pega  */
      const tokenRequest = req.clone({
        headers : req.headers.set('Authorization', token)
      });

      /* continua e envia para o back end */
      return next.handle(tokenRequest).pipe(
        tap((event: HttpEvent<any>) => {
          if(event instanceof HttpResponse && (event.status === 200 || event.status === 201)){
            console.info('Sucesso na operação');
          }
        })
      );

      /* se não tiver o token então volta com o mesmo que veio da requisição (sem token) e envia para o handle  */
    }else{
        return next.handle(req).pipe(catchError(this.processarError));
    }

  }

   constructor() {}

     processarError(error : HttpErrorResponse ){
       let errorMessage = 'Erro desconhecido';
       if(error.error instanceof ErrorEvent){
         console.error(error.error);
         errorMessage = 'Error: ' + error.error.error;
       } else{
         errorMessage = 'Código' + error.error.code + '\nMensagem: ' + error.error.error
       }
       window.alert(errorMessage)
       return throwError(errorMessage)


   }



}

@NgModule({
  providers : [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true,
  },
],
})

export class HttpInterceptorModule {

}

