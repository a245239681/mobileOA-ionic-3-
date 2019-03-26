import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainindexService } from '../../service/maiindex/mainindex.service';
import { CommonHelper } from '../../infrastructure/commonHelper';
import { UserInfo } from '../../infrastructure/user-info';
import { DocumentlistPage } from '../documentlist/documentlist';

/**
 * Generated class for the HaveoverpersonselectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-haveoverpersonselect',
  templateUrl: 'haveoverpersonselect.html',
})
export class HaveoverpersonselectPage {

  /**
   * 传过来的模型
   */
  itemmodel: any;
  hasSelected: any; // 自动勾选已选列表
  // 选中人员
  selectPerson: any;
  commitType: string;
  isshow: boolean;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private mainservice: MainindexService,
    private toast: CommonHelper,
    private userinfo: UserInfo
    ) {
      this.itemmodel = this.navParams.get('item');
      this.hasSelected = this.navParams.get('hasSelected');
      this.toast.dismissLoading();
  }

  hostSelected(items: any) {
    this.selectPerson = items.map(res => {
      return res['Id'];
    });
  }
  ngOnInit() {
    if (
      this.itemmodel.ProcessType === 2 ||
      this.userinfo.GetUserDegree() === 'true'
    ) {
      this.isshow = true;
    } else if (this.itemmodel.ProcessType === 1 && this.userinfo.GetUserDegree() !== 'true') {
      this.isshow = false;
    }
    this.mainservice
      .ValidMove(
        this.itemmodel['Id'],
        this.itemmodel.ProcessType,
        this.itemmodel.CoorType
      )
      .subscribe(res => {
        if (res.State === 1) {
          this.commitType = '60';
        }
      });
  }
  /** 提交 */
  handin() {
    const params = {
      id: this.itemmodel['Id'],
      // 主办id 单选
      nextUserId: this.selectPerson.length > 0 ? this.selectPerson.join() : '',
      primaryDeptId: '',
      cooperaters: [],
      readers: [],
      // 模态框
      commitType: this.commitType,

      CoorType: this.itemmodel['CoorType'],

      ProcessType: this.itemmodel['ProcessType']
    };
    if (this.itemmodel.ProcessType === 1 && this.userinfo.GetUserDegree() === 'true') {
      params['nextUserId'] = '';
      params['nextActionId'] = 0;
      params['commitType'] = '50';
      params['leaders'] = this.selectPerson.length > 0 ? this.selectPerson : [];
    }
    // const cmdata = JSON.stringify(params);
    this.mainservice.MoveCommit(params).subscribe(res => {
      if (res['State'] === 1) {
        this.toast.presentToast('移交成功');
        this.navCtrl.popTo(DocumentlistPage);
      } else {
        this.toast.presentToast(res['Message']);
      }
    });
  }

}
