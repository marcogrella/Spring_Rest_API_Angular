import { AppConstants } from './../app-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario) {

    console.log("Nome: " + usuario.login +" Senha: "+  usuario.senha)

    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {

      /*Retorno Http*/

      var token = JSON.parse(JSON.stringify(data)).token.split(' ')[1];

      localStorage.setItem('token', token);

      console.log(localStorage.getItem('token'))

      this.router.navigate(['userList']);


    },
      error => {
        console.error("Erro ao fazer login ");
      }
    );
  }

}
