import { DocumentlistPage } from './../documentlist/documentlist';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainindexService } from '../../service/maiindex/mainindex.service';
import { CommonHelper } from '../../infrastructure/commonHelper';

/**
 * Generated class for the ReturnbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-returnback',
  templateUrl: 'returnback.html',
})
export class ReturnbackPage {

  itemmodel: any;
  tree: any[];
  selectPerson: string;
  commitType: string;
  NextActionId: string;
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
    this.getData();
  }
  singleSelect(item: any, data: string, event) {
    event.stopPropagation();

    if (item.data.Type === 2) {
      this.selectItem.checked = false;
      item.checked = true;
      this.selectItem = item;
      this.selectPerson = item['value'];
      this.NextActionId = data;
    } else {
      item.expanded = !item.expanded;
    }

    // this.selected.emit({ items: [item] });
  }
  ionSelect(item, e) {}
  ValidBack() {
    this.mainservice
      .ValidBack(
        this.itemmodel['Id'],
        this.itemmodel['ProcessType'],
        this.itemmodel['CoorType']
      )
      .subscribe(
        res => {
          if ((<any>res).State === 1) {
            this.commitType = '40';
          }
        },
        () => {
          this.toast.presentToast('请求失败');
        }
      );
  }

  generateData(item) {
    return {
      value: item.Id,
      text: item.Label,
      data: item,
      children: item.Children.map(p => this.generateData(p))
    };
  }

  getData() {
    this.mainservice
      .getBackActionTree(this.itemmodel['Id'], this.itemmodel['ProcessType'])
      .subscribe(
        (res: any) => {
          if (res['State'] === 1) {
            this.tree = res.Data.BackAllTree.map(p => this.generateData(p));

            // this.tree = res['Data']['BackAllTree'];
          } else {
            this.toast.presentToast('已无数据');
          }
        },
        () => {
          this.toast.presentToast('请求失败');
        }
      );
  }
  commit() {
    const parms = {
      id: this.itemmodel['Id'],
      // 主办id 单选
      NextActionId: this.NextActionId,
      nextUserId: this.selectPerson.length > 0 ? this.selectPerson : '',
      primaryDeptId: '',
      cooperaters: [],
      readers: [],
      // 模态框
      commitType: '40',

      CoorType: this.itemmodel['CoorType'],

      ProcessType: this.itemmodel['ProcessType']
    };
    this.mainservice.MoveCommit(parms).subscribe(res => {
      if (res['State'] === 1) {
        this.toast.presentToast('退回成功');
        this.navCtrl.popTo(DocumentlistPage);
      } else {
        this.toast.presentToast(res['Message']);
      }
    });
  }


}
