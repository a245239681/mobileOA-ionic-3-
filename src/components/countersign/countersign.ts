import { Component, Input } from '@angular/core';
import { CommitModel, MainindexService } from '../../service/maiindex/mainindex.service';
import { NavParams, ModalController, NavController } from 'ionic-angular';
import { CommonHelper } from '../../infrastructure/commonHelper';
import { DocumentlistPage } from '../../pages/documentlist/documentlist';

/**
 * Generated class for the CountersignComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'countersign',
  templateUrl: 'countersign.html'
})
export class CountersignComponent {

  /** 开启页面传过来的值 */
  @Input() data: any;
  // @Output() selected = new EventEmitter<{ items: any[] }>();
  /** 协办 */
  listdataArr: any;
  /** 勾选数组 */
  selectedList = [];
  /** 提交对象 */
  myData: CommitModel;

  constructor(
    public navParams: NavParams,
    public modalController: ModalController,
    private mainindexservice: MainindexService,
    private toast: CommonHelper,
    private navCtrl: NavController
    ) {
   
  }

  ionViewDidLoad(){
    this.getDeptTreeUntilMainDept();
    // 赋值给提交对象
    this.myData = {
      /** 业务Id */
      id: this.data.Id,
      nextActionId: 0,
      isSendMsg: false,
      isSnedSms: false,
      nextUserId: '',
      primaryDeptId: '',
      leaders: [],
      /** 勾选id数组 */
      cooperaters: [],
      readers: [],
      commitType: 70,
      /** 操作业务的获取 */
      coorType: this.data.CoorType,
      count: 0,
      /** 操作业务的获取 */
      processType: this.data.ProcessType
    };
  }

  /** 请求一级部门 */
  getDeptTreeUntilMainDept() {
    this.mainindexservice.getDeptTreeUntilMainDept().subscribe(
      res => {
        if (res['State'] === 1) {
          this.listdataArr = res['Data'];
        } else {
          this.toast.presentToast('已无数据');
        }
      },
      () => {
        this.toast.presentToast('请求失败');
      }
    );
  }

  /** 勾选 */
  mutiSelect(item: any, checked: boolean) {
    if (checked) {
      this.selectedList.push(item);
    } else {
      // 去掉没选中的如果之前选过的
      this.selectedList = this.selectedList.filter(data => data.id !== item.id);
    }
  }

  /** 提交 */
  commit() {
    /** 过滤把勾选的id存入提交对象 */
    const cooperaters = [];
    this.selectedList.forEach(e => {
      cooperaters.push(e.id);
    });
    this.myData.cooperaters = cooperaters;
    if (this.myData.cooperaters.length !== 0) {
      this.mainindexservice.commit(this.myData).subscribe(
        r => {
          if (r['State'] === 1) {
            this.navCtrl.popTo(DocumentlistPage);
            
            this.toast.presentToast('提交成功');
          } else {
            this.toast.presentToast(r['Message']);
          }
        },
        () => {
          this.toast.presentToast('请求失败');
        }
      );
    }
  }

}
