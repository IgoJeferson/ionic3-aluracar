import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgendamentoDaoProvider } from "../../providers/agendamento-dao/agendamento-dao";
import { Agendamento } from "../../modelos/agendamento";
import { AgendamentosServiceProvider } from "../../providers/agendamentos-service/agendamentos-service";

@IonicPage()
@Component( {
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
} )
export class ListaAgendamentosPage {

  agendamentos: Agendamento[];
  private _alerta;

  constructor( public navCtrl: NavController,
               public navParams: NavParams,
               private _alertCtrl: AlertController,
               private _agendamentoServiceProvider: AgendamentosServiceProvider,
               private _agendamentoDaoProvider: AgendamentoDaoProvider ) {
  }

  ionViewDidLoad() {

    this._agendamentoDaoProvider.listaTodos()
      .subscribe( ( agendamentos: Agendamento[] ) => {
        this.agendamentos = agendamentos;
      } );

  }

  reenvia( agendamento: Agendamento ) {

    this._alerta = this._alertCtrl.create( {
      title: 'Aviso ',
      buttons: [
        {
          text: 'ok'
        }
      ]
    } );

    let mensagem = '';

    this._agendamentoServiceProvider.agenda( agendamento )
      .mergeMap( ( valor ) => {

        let observable = this._agendamentoDaoProvider.salva( agendamento );

        if ( valor instanceof Error ) {
          throw valor;
        }

        return observable;

      } )
      .finally(
        () => {
          this._alerta.setSubTitle( mensagem ).present();
        }
      )
      .subscribe(
        () => mensagem = 'Agendamento reenviado!',
        ( err: Error ) => mensagem = err.message
      );

  }

}
