import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the QrCorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-core',
  templateUrl: 'qr-core.html',
})
export class QrCorePage implements OnInit {
  sub: any;
  constructor(private nav: NavController, private platform: Platform) {}

  ngOnInit() {

  }
  /** 返回 */
  canGoBack() {
   // this.nav.back();
  }
  ionViewWillLeave() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
