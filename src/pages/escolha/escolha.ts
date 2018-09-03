import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from "../../modelos/carro";
import { Acessorio } from "../../modelos/acessorio";

@IonicPage()
@Component( {
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
} )
export class EscolhaPage {

  public carro: Carro;
  public acessorios: Array<Acessorio>;
  private _precoTotal: number;

  constructor( public navCtrl: NavController, public navParams: NavParams ) {

    this.carro = this.navParams.get( 'carroSelecionado' );
    this._precoTotal = this.carro.preco;
    this.acessorios = [
      { nome: "Freio ABS", preco: 800 },
      { nome: "Ar-condicionado", preco: 1000 },
      { nome: "MP3 Player", preco: 500 }
    ];
  }

  public getPrecoTotal() {
    return this._precoTotal;
  }

  atualizaTotal( ativado: boolean, acessorio: Acessorio ) {
    console.log( ativado + " " + acessorio);
    ativado ?
      this._precoTotal += acessorio.preco :
      this._precoTotal -= acessorio.preco;
  }


}
