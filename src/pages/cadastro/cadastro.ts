import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from "../../modelos/carro";
import { AgendamentosServiceProvider } from "../../providers/agendamentos-service/agendamentos-service";
import { HomePage } from "../home/home";
import { Agendamento } from "../../modelos/agendamento";
import { AgendamentoDaoProvider } from "../../providers/agendamento-dao/agendamento-dao";

@IonicPage()
@Component( {
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
} )
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();
  private _alerta: Alert;

  constructor( public navCtrl: NavController,
               public navParams: NavParams,
               private _alertCtrl: AlertController,
               private _agendamentoServiceProvider: AgendamentosServiceProvider,
               private _agendamentoDaoProvider: AgendamentoDaoProvider ) {
    this.carro = this.navParams.get( 'carroSelecionado' );
    this.precoTotal = this.navParams.get( 'precoTotal' );

  }

  agenda() {

    if ( !this.nome || !this.endereco || !this.email ) {

      this._alertCtrl.create( {
        title: 'Validação dos campos',
        subTitle: 'Todos os campos são de preenchimento obrigatório',
        buttons: [
          { text: 'ok ' }
        ]
      } ).present();

      return;
    }

    let agendamento: Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal,
      confirmado: false,
      enviado: false,
      data: this.data
    };

    this._alerta = this._alertCtrl.create( {
      title: 'Aviso ',
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.navCtrl.setRoot( HomePage );
          }
        }
      ]
    } );

    let mensagem = '';

    this._agendamentoServiceProvider.agenda( agendamento )
      .mergeMap( ehDuplicado => {
        if ( ehDuplicado ) {
          throw new Error( 'Agendamento já existente! ' );
        }

        return this._agendamentoDaoProvider.salva( agendamento );

      } )
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
        () => mensagem = 'Agendamento realizado!',
        ( err: Error ) => mensagem = err.message
      );
  }

}
