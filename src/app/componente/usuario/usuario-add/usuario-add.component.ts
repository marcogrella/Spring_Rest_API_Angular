
import { Profissao } from './../../../model/profissao';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; /* classe necessária para fazer o parâmetro id ser adicionado e ser levado */
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Telefone } from 'src/app/model/telefone';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string>{
  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if(value){
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
  }
  return null;
}

  toModel(date: NgbDateStruct | null): string | null {
    return date ? (date.day) + this.DELIMITER + date.month + this.DELIMITER + date.year: null;
  }

}



@Injectable()
export class FormataData extends NgbDateParserFormatter{

  readonly DELIMITER = '/'; // 01/01/2001

  errorMessage: String ='';

  parse(value: string): NgbDateStruct | null {
    if(value){
        let date = value.split(this.DELIMITER);
        return {
          day: parseInt(date[0], 10),
          month: parseInt(date[1], 10),
          year: parseInt(date[2], 10)
        };
    }
    return null;
  }

  format(date: NgbDateStruct): string {

    return date ? validarData(date.day) + this.DELIMITER + validarData(date.month) + this.DELIMITER + date.year: '';

  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? (date.day) + this.DELIMITER + date.month + this.DELIMITER + date.year: null;
  }

}

  /* função para adicioanr um 0 na frente do valor caso for dia/mês menor que 10 */
  function validarData(valor){
    if(valor.toString !== '' && parseInt(valor) <= 9){
        return '0' + valor;
    }
    return valor;

}


@Component({
  selector: 'app-root', /* alterado de app-usuario-add para 'app-root'*/
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers : [{provide: NgbDateParserFormatter, useClass: FormataData},
                {provide: NgbDateAdapter, useClass: FormatDateAdapter }]
})
export class UsuarioAddComponent implements OnInit {

  usuario = new Usuario();

  telefone = new Telefone();

  profissao = new Profissao();

  public profissoes!: Array<Profissao>;

  public loginError: Boolean = false;
  public cpfError: Boolean = false;
  public cepError: Boolean = false
  messageError: string = '';

  messageSaveOrUpdatedSuccessful: string = '';
  public usuarioSavedOrUpdated: Boolean = false;

  constructor(private routeActive: ActivatedRoute, private usuarioService: UsuarioService, private http: HttpClient, private router : Router) { }

  ngOnInit(): void {

      this.usuarioService.getProfissaoList().subscribe(data => {
      this.profissoes = data;
      this.usuario.profissao = this.profissoes[0]
    });

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
          // console.info("Atualizar" + this.usuario)
          this.usuarioService.atualizarUsuaro(this.usuario).subscribe(data => {
          this.novoUsuario();
        });

        this.messageSaveOrUpdatedSuccessful = "Usuário atualizado com sucesso!";

     /* se o id não exista é porque iremos salvar */
     } else{
        this.usuarioService.salvarUsuaro(this.usuario).subscribe(data => {
          this.novoUsuario();
       });
          this.messageSaveOrUpdatedSuccessful = "Usuário salvo com sucesso!";
      }

      this.usuarioSavedOrUpdated = true;

      setTimeout(() =>{
          this.usuarioSavedOrUpdated = false;

      },3000);




  }


validarCEP(){

  if(this.usuario.cep.length < 8 || this.usuario.cep === null || this.usuario.cep == ''){
    this.cepError = true;
    this.messageError = 'Digite um cep válido.'
    this.usuario.cep = ''
    setTimeout(() =>{
      this.cepError = false;
    },3000);


  } else{
    this.usuarioService.consultaCep(this.usuario.cep).subscribe(data => {
    let valida : boolean = data;
      if(valida === false){
        this.usuario.cep = ''
        this.cepError = true;
        this.messageError = 'O CEP digitado é inválido, verifique novamente.'
      setTimeout(() =>{
        this.cepError = false;
    },3000);

    }
    });
}
}


validarCPF(){

  let validaCPF: Boolean = this.usuarioService.testaCPF(this.usuario.cpf);
    if(validaCPF === false){
      this.cpfError = true;
      this.messageError= "O CPF é inválido. Verifique novamente."
      this.usuario.cpf = '';
      setTimeout(() =>{
      this.cpfError = false;
  },3000);
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

  validarLogin(){
    let validaLogin: boolean;
    this.usuarioService.verificarLogin(this.usuario.login).subscribe(data => {
      let validaLogin : boolean = data;
        if(validaLogin == true){
          this.loginError = true;
          this.messageError= "O login já existe. Verifique novamente."
          this.usuario.login = '';
          setTimeout(() =>{
          this.loginError = false;
        },3000);
      }
    });
  }




}

