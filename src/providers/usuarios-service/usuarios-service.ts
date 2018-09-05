import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../../modelos/usuario";

@Injectable()
export class UsuariosServiceProvider {

  private _usuarioLogado: Usuario;

  constructor( private _http: HttpClient ) {
  }

  efetuaLogin( email, senha ) {
    this._http.post<Usuario>( 'http://localhost:8080/api/login', { email, senha } )
              .do ( usuario => this._usuarioLogado = usuario );

  }

  obtemUsuarioLogado() {
    this._usuarioLogado;
  }


}
