import { AppComponent } from './../app.component';
import { Usuario } from 'src/app/model/usuario';
import { AppConstants } from './../app-constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/* Esta classe faz a requisição para o back end para caregar os usuários. */

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(private http: HttpClient) { }

  /* any é um padrão de retorno */
  getStudentList(): Observable<any>{
    return this.http.get<any>(AppConstants.baseUrl) /* chama o contexto utilizando uma requisição do tipo get */
  }

  deletarUsuario(id: Number): Observable<any>{
    return this.http.delete(AppConstants.baseUrl+id, {responseType: 'text'});

  }

  consultarUser(nome: String): Observable<any> {
    return this.http.get(AppConstants.baseUrl+"usuarioPorNome/"+nome);
  }

  getStudentById(id): Observable<any>{
    return this.http.get<any>(AppConstants.baseUrl + id)
  }

  salvarUsuaro(usuario) : Observable<any>{
    return this.http.post<any>(AppConstants.baseUrl, usuario);
  }

  atualizarUsuaro(usuario) : Observable<any>{
    return this.http.put<any>(AppConstants.baseUrl, usuario);
  }

  removerTelefone(id): Observable<any>{
    // responseType: "text" porque espera-se um retorno em texto pois no backend é enviado um texto como resposta.
    return this.http.delete(AppConstants.baseUrl+ "removerTelefone/" + id, {responseType: "text"});
  }

  userAutenticado(){
    if(localStorage.getItem('token') !== null &&
    localStorage.getItem('token')?.toString().trim() != null){
     return true;
    } else{
      return false;
    }
  }
}
