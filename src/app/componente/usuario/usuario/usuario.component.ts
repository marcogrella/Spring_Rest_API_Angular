
import { UsuarioService } from './../../../service/usuario.service';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public students!: Array<Usuario>

  nome! : String;

  constructor(private usuarioService: UsuarioService) {

   }

  /* o Subscribe é sempre o retorno do envio. depende do endpoint */

    ngOnInit() {
          this.usuarioService.getStudentList().subscribe(data =>{
          this.students = data;
    });
  }

  deleteUsuario(id: Number){

    if(confirm('Deseja mesmo remover?')){

      this.usuarioService.deletarUsuario(id).subscribe(data=>{

     /* atualizamos a lista após a exclusão: */
      this.usuarioService.getStudentList().subscribe(data =>{
      this.students = data;
      });
    });

    }

  }

  consultarUser(){
    this.usuarioService.consultarUser(this.nome).subscribe(data =>{
      this.students = data;
    })
  }

}
