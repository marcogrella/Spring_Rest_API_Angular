import { AppConstants } from './../app-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  login(usuario){
     return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {
       /* corpo do retorno http */

       /* se o login estiver correto recebemos um token. Utilizamos somente o token (sem os profixos) */
       var token = JSON.parse(JSON.stringify(data)).token.split(' ')[1];

       /* guardamos em uma variável o token: */
        localStorage.setItem("token", token);

     }, error =>{
          alert("Erro ao realizar o login. Senha ou Usuário inválido.");
     });
  }

}
