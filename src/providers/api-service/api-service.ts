import { Injectable } from '@angular/core';

@Injectable()
export class ApiServiceProvider {

  // Quando for necessário, aqui será o único lugar a ser modificado!
  // private _url: string = 'http://localhost:8085/api';
  private _url: string = 'http://192.168.0.18:8085/api';

  get url() {
    return this._url;
  }

}
