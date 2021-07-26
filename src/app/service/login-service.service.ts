import { Usuario } from 'src/app/model/usuario';
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
    console.log(AppConstants.baseLogin)
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

  recuperar(login) {

    let usuario =  new Usuario();
    usuario.login = login;


    return this.http.post(AppConstants.getBaseUrlPathRecupear(), usuario).subscribe(data => {

      alert(JSON.parse(JSON.stringify(data)).error);


    },
      error => {
        console.error("Erro ao recuperar o login");
        alert('Erro ao recuperar login!')
      }
    );
  }



}
