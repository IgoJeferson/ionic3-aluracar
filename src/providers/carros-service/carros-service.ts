import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from "@angular/common/http";
import { Carro } from "../../modulos/carro";

@Injectable()
export class CarrosServiceProvider {

  constructor( private _http: HttpClient ) {
  }

  lista() {
    return this._http.get<Carro[]>( "http://localhost:8080/api/carro/listaTodos" )
  }

}
