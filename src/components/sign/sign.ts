import { Component, Input } from '@angular/core';
import { MainindexService } from '../../service/maiindex/mainindex.service';
import { CommonHelper } from '../../infrastructure/commonHelper';

/**
 * Generated class for the SignComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sign',
  templateUrl: 'sign.html'
})
export class SignComponent {

  @Input() itemmodel: any;
  myData: any;
  /** 标题 */
  title: string;
  /** 正文模板 */
  templateType: string;

  constructor(
    public mainindexService: MainindexService,
    private toast: CommonHelper) {
  }

  ionViewDidLoad(){
    if (this.itemmodel.documenttype === 1) {
      this.title = '收文登记表';
      this.GetReceiveData(this.itemmodel.Id);
    } else if (this.itemmodel.documenttype === 2) {
      this.title = '发文拟稿';
      this.GetSendModelById(this.itemmodel.Id);
    }
  }

  /** 请求发文笺详情 */
  GetSendModelById(Id: string) {
    this.mainindexService.GetSendModelById(Id).subscribe(
      r => {
        if (r['State'] === 1) {
          this.myData = r['Data'];
          this.templateType = r['templateType'];
          this.myData.TypeStr = JSON.parse(this.myData.TypeStr);
        } else {
          this.toast.presentToast('暂无数据');
        }
      },
      () => {
        this.toast.presentToast('请求失败');
      }
    );
  }
  /** 请求办文笺详情 */
  GetReceiveData(Id: string) {
    this.mainindexService.GetReceiveData(Id).subscribe(
      r => {
        if (r) {
          this.myData = r;
        } else {
          this.toast.presentToast('暂无数据');
        }
      },
      () => {
        this.toast.presentToast('请求失败');
      }
    );
  }


}
