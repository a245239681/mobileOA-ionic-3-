import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainindexService, LastSendActionStepModel } from '../../service/maiindex/mainindex.service';
import { CommonHelper } from '../../infrastructure/commonHelper';
import { DocumentlistPage } from '../documentlist/documentlist';

/**
 * Generated class for the SendactiontreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sendactiontree',
  templateUrl: 'sendactiontree.html',
})
export class SendactiontreePage {
  treeData = [];

  itemmodel: any;

  //列表数组
  dataArr: any;

  //层数目
  floor: number;

  selectItem: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mainservice: MainindexService,
    private toast: CommonHelper,
  ) {
    this.itemmodel = this.navParams.get('item');
  }

  ionViewDidLoad() {
    this.getdata();
  }

  singleselect(item: TreeItem, data, event) {
    event.stopPropagation();
    if (item.data.Type === 2) {
      this.selectItem.checked = false;
      item.checked = true;
      this.selectItem = item.data;
      // this.dataArr = item.value;
      if (Number(data).toString() === 'NaN') {
        this.dataArr = this.treeData[0]['value'];
      } else {
        this.dataArr = data;
      }
    } else {
      item.expanded = !item.expanded;
    }
  }

  generateData(item): TreeItem {
    return {
      value: item.Id,
      text: item.Label,
      data: item,
      children: item.Children.map(p => this.generateData(p))
    };
  }

  async getdata() {
    let res: any = await this.mainservice
      .GetActionTreeSend(this.itemmodel['Id'], this.itemmodel['ProcessType'])
      .toPromise();
    // .subscribe((res: any) => {

    if (res.State === 1) {
      this.floor = res.Data[0].Type === 2 ? 2 : 3;
      this.treeData = res.Data.map(p => this.generateData(p));
    }
  }

  //提交
  handinclick() {
    // LastSendActionStep
    if (!this.selectItem) {
      this.toast.presentToast('请先选择');
      return;
    }
    var handlemodel = <LastSendActionStepModel>{
      id: this.itemmodel['Id'],
      NextActionId: this.dataArr ? this.dataArr : '',
      NextUserId: this.selectItem ? this.selectItem['Id'] : '',
      commitType: this.itemmodel['commitType'],
      ProcessType: this.itemmodel['ProcessType'],
      CoorType: this.itemmodel['CoorType']
    };

    this.mainservice.LastSendActionStep(handlemodel).subscribe(res => {
      if (res['State'] == 1) {
        this.toast.presentToast('提交成功');
        this.navCtrl.popTo(DocumentlistPage);
      }
    });
  }

}

export class TreeItem {
  value: string;
  text: string;
  data?: any;
  checked?: boolean;
  expanded?: boolean;
  parent?: TreeItem;
  children: TreeItem[];
}


