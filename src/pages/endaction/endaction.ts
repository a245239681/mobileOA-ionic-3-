import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { lasthandinStepModel, MainindexService } from '../../service/maiindex/mainindex.service';
import { CommonHelper } from '../../infrastructure/commonHelper';
import { DocumentlistPage } from '../documentlist/documentlist';

/**
 * Generated class for the EndactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-endaction',
  templateUrl: 'endaction.html',
})
export class EndactionPage {

  //传进来的itemmodel
  itemmodel: any;

  //选项数组
  radioArr: any[] = [];

  selectitem: any = null;

  handleModel: lasthandinStepModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private mainservice: MainindexService,
    private toast: CommonHelper,
    ) {
      this.itemmodel = this.navParams.get('item');
  }

  ionViewDidLoad() {
    this.getenddata();
  }

  /**
   * 获取数据
   */
  getenddata() {
    this.mainservice.getendAction(this.itemmodel['Id'], this.itemmodel['ProcessType']).subscribe((res) => {
      if (res['State'] == 1) {
        this.radioArr = res['Data'];
      } else {
        this.toast.presentToast(res['Message']);
      }
    }, err => {
      this.toast.presentToast('请求失败');
    });
  }

  /**
   * 提交
   */
  handinclick() {
    if (this.selectitem) {

      this.mainservice.endActionStep(this.itemmodel['Id'], this.itemmodel['commitType'], this.selectitem['id'],this.itemmodel['ProcessType']).subscribe((res) => {
        if (res['State'] == 1) {
          this.toast.presentToast('操作完成');
          this.navCtrl.popTo(DocumentlistPage);
        }
      });
    } else {
      this.toast.presentToast('请选择');
    }
  }

  /**
   * 单选
   */
  singleSelect(index: number) {
    this.radioArr[index]['checked'] = !this.radioArr[index]['checked'];

    if (this.radioArr[index]['checked'] == true) {
      this.selectitem = this.radioArr[index];
    } else {
      this.selectitem = null;
    }
  }


}
