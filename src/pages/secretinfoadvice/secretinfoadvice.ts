import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonHelper } from '../../infrastructure/commonHelper';
import { MainindexService } from '../../service/maiindex/mainindex.service';
import { SendactiontreePage } from '../sendactiontree/sendactiontree';

/**
 * Generated class for the SecretinfoadvicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-secretinfoadvice',
  templateUrl: 'secretinfoadvice.html',
})
export class SecretinfoadvicePage {
  textAreaValue: string = '';

  itemmodel: any;

  title: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mainservice: MainindexService,
    private toast: CommonHelper,
  ) {
    this.itemmodel = this.navParams.get('item');
    this.title = this.navParams.get('title');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecretinfoadvicePage');
  }

  handinclick() {
    
    if (this.textAreaValue.length == 0) {
      this.toast.presentToast('请填写' + this.title);
      return;
    }
    if (this.title == '公开信息意见') {
      this.mainservice.OpenInfoAdvice(this.itemmodel['Id'], this.textAreaValue).subscribe((res) => {
        if (res['State'] == 1) {
          this.navCtrl.push(SendactiontreePage, {
            item: this.itemmodel
          });
        }
      });
    }
    else {
      this.mainservice.SecretInfoAdvice(this.itemmodel['Id'], this.textAreaValue).subscribe((res) => {
        if (res['State'] == 1) {
          this.navCtrl.push(SendactiontreePage, {
            item: this.itemmodel
          });
        }
      });
    }

  }

}
