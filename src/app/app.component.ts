import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  title = 'Angular Rest';

  constructor(private router: Router){}

  /* implementamos o onInit que verifica logo na página inicial se o usuário possui ou não token. Se não redireciona para o login */
  ngOnInit(): void {
    if(localStorage.getItem('token') ==null ){
        this.router.navigate(['login']);
    }
  }

  public sair(){
    localStorage.clear(); /* exclui o token */
    this.router.navigate(['login']);
  }

  /* esconde a barra de menu se não tiver token*/
  public esconderBarra(){
    if(localStorage.getItem('token') !== null &&
    localStorage.getItem('token')?.toString().trim() != null){
     return false;
    } else{
      return true;
    }
  }
}
