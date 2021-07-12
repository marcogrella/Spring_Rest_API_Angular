import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; /* classe necessária para fazer o parâmetro id ser adicionado e ser levado */
import { Telefone } from 'src/app/model/telefone';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-root', /* alterado de app-usuario-add para 'app-root'*/
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new Usuario();

  telefone = new Telefone();

  constructor(private routeActive: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    let id = this.routeActive.snapshot.paramMap.get('id');

    /* se o id que for consultado realmente existir */
    if(id != null){
      this.usuarioService.getStudentById(id).subscribe(data =>{

        this.usuario = data;
        //console.log("usuario " + this.usuario.nome + "id " + this.usuario.id);
      });
     }
    }

    /* salvar usuário */
    salvarUser(){

      /* Aqui verifica se o id é diferente de null e diferente de vazio , fazemos a atualização (editar) */
     if(this.usuario.id != null && this.usuario.id.toString().trim() != null){
        console.info("Atualizar" + this.usuario)
          this.usuarioService.atualizarUsuaro(this.usuario).subscribe(data => {
          this.novoUsuario();
        });

     /* se o id não exista é porque iremos salvar */
     } else{
        console.info("Salvar" + this.usuario)
        this.usuarioService.salvarUsuaro(this.usuario).subscribe(data => {
          this.novoUsuario();
       });
      }

  }

    novoUsuario(){
      this.usuario = new Usuario();
      this.telefone = new Telefone();
    }

    deletarTelefone(id, i){

      /* essa verificação é no caso de adicionar um id, como chamamos o método para adicionar e esse id ainda não existe no
      banco  */
      if(id == null){
        this.usuario.telefones.splice(i, 1);
        return;
      }

      if (id !== null && confirm("Deseja remover o telefone?")) {
          this.usuarioService.removerTelefone(id).subscribe(data =>{
            this.usuario.telefones.splice(i, 1); /* remove o telefone com base no index informado */
            // console.info("Ação: " + data);
          });
    }
  }


  addFone(){
    /* antes de adicionar devemos verificar se a lista está vazia, devemos instanciar a lista. Isto ocorre porque no caso o usuário
    pode não ter nenhum telefone cadatrado anteriormente. */
    if(this.usuario.telefones === undefined){
        this.usuario.telefones = new Array<Telefone>();
    }
    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

}
