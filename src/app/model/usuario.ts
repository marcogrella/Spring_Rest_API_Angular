import { Profissao } from './profissao';
import { Telefone } from './telefone';
export class Usuario {
  id!: Number;
	login: String = '';
	senha: String = '';
	nome: String = '';
	cpf: string = '';
  cep: String = '';
  dataNascimento!: String ;
  salario!: DoubleRange;
  telefones!: Array<Telefone>

  profissao: Profissao = new Profissao();

}
