import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../../modelos/usuario";
import { ApiServiceProvider } from "../api-service/api-service";

@Injectable()
export class UsuariosServiceProvider {

  private _usuarioLogado: Usuario;
  private _url: string;

  constructor( private _http: HttpClient,
               private _api: ApiServiceProvider ) {

    this._url = this._api.url;
    
  }

  efetuaLogin( email, senha ) {
    return this._http.post<Usuario>( this._url + '/login', { email, senha } )
      .do( usuario => this._usuarioLogado = usuario );

  }

  obtemUsuarioLogado() {
    return this._usuarioLogado;
  }


}
