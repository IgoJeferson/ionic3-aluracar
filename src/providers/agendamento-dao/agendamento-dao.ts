import { Injectable } from '@angular/core';
import { Agendamento } from "../../modelos/agendamento";
import { Observable } from "rxjs";
import { Storage } from "@ionic/storage";

@Injectable()
export class AgendamentoDaoProvider {

  constructor( private _storage: Storage ) {
    console.log( 'Hello AgendamentoDaoProvider Provider' );
  }

  salva( agendamento: Agendamento ) {
    let chave = this._geraChave( agendamento );
    let promise = this._storage.set( chave, agendamento );

    return Observable.fromPromise( promise );
  }

  private _geraChave( agendamento: Agendamento ) {
    return agendamento.emailCliente + agendamento.data.substr( 0, 10 );
  }

  ehDuplicado( agendamento: Agendamento ) {
    let chave = this._geraChave( agendamento );
    let promise = this._storage
                      .get( chave )
                      .then( dado => dado ? true : false);

    return Observable.fromPromise( promise );

  }

}
