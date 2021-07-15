
import { UsuarioService } from './../../../service/usuario.service';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { isEmpty } from 'rxjs/operators';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public students!: Array<Usuario> /* anterior (sem paginação) */

  
  nome! : string;

  p!: number;
  total!: number; /* referente ao data.totalElements -> no caso seria o total de registros que existem no banco */


  constructor(private usuarioService: UsuarioService) {

   }

  /* o Subscribe é sempre o retorno do envio. depende do endpoint */

    ngOnInit() {
          this.usuarioService.getStudentListPage(0).subscribe(data =>{
          this.students = data.content;
          this.total = data.totalElements;
    });
  }

  deleteUsuario(id: Number, index){

    if(confirm('Deseja mesmo remover?')){

      this.usuarioService.deletarUsuario(id).subscribe(data=>{

     /* atualizamos a lista após a exclusão:
     OBS: não precisamos mais destas linhas comentadas, pois a lista paginada já está em tela.
     No entanto precisamos identificar o índice do valor excluído e retirar da lista  */
          // this.usuarioService.getStudentList().subscribe(data =>{
          //this.students = data;
          // });
        this.students.splice(index, 1) /* o index é o parâmetro enviado no html */
    });

    }

  }


consultarUser(){
    /* se no campo de consulta não tiver nome traz a paginação normal */
      if(this.nome === ''){
        this.usuarioService.getStudentListPage(0).subscribe(data =>{
          this.students = data.content;
          this.total = data.totalElements;
        });
        /* caso tenha nome traz a */
      } else{
      this.usuarioService.consultarUsuario(this.nome).subscribe(data =>{
      this.students = data.content;
      this.total = data.totalElements;
    });
  }
}

  carregarPagina(pagina){

      if(this.nome !== ''){
          this.usuarioService.consultarUsuarioPorPaginacao(this.nome, pagina - 1).subscribe(data =>{
          this.students = data.content;
          this.total = data.totalElements;
        });
      } else {
          this.usuarioService.getStudentListPage(pagina - 1).subscribe(data =>{
          this.students = data.content;
          this.total = data.totalElements;
      });

      }

    }

  }


