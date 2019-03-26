import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentlistPage } from '../documentlist/documentlist';

/**
 * Generated class for the SigsusscesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sigsussces',
  templateUrl: 'sigsussces.html',
})
export class SigsusscesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  back() {
    this.navCtrl.popTo(DocumentlistPage);
  }

}
