import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { Carro } from "../../modulos/carro";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Component( {
  selector: 'page-home',
  templateUrl: 'home.html'
} )
export class HomePage {

  public carros: Carro[];

  constructor( public navCtrl: NavController,
               private _http: HttpClient,
               private _loadingCtrl: LoadingController,
               private _alertCtrl: AlertController ) {

    let loading = this._loadingCtrl.create( {
      content: 'Carregando carros... '
    } );

    loading.present();

    this._http.get<Carro[]>( "http://localhost:8080/api/carro/listaTodosz" )
      .subscribe(
        ( carros ) => {
          this.carros = carros;
          loading.dismiss();
        },
        ( err: HttpErrorResponse ) => {

          loading.dismiss();

          this._alertCtrl.create({
            title: 'Falha na conexão',
            subTitle: 'Não foi possivel carregar a lista de carros. Tente novamente mais tarde.',
            buttons: [
              { text: 'Ok' }
              ]
          }).present();
        }
      );

  }

}