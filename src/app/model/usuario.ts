import { Telefone } from './telefone';
export class Usuario {
  id!: Number;
	login: String = '';
	senha: String = '';
	nome: String = '';
	cpf: string = '';
  cep: String = '';

  telefones!: Array<Telefone>

}
