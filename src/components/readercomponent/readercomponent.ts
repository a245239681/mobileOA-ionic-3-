import { Component } from '@angular/core';
import { MainindexService } from '../../service/maiindex/mainindex.service';
import { CommonHelper } from '../../infrastructure/commonHelper';

/**
 * Generated class for the ReadercomponentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'readercomponent',
  templateUrl: 'readercomponent.html'
})
export class ReadercomponentComponent {

    /**
   * 住房局的所有机构的数组
   */
  alldepartmentArr: any[] = [];

  constructor(
    private mainservice: MainindexService,
    private toast: CommonHelper) {
    
  }

  ngOnInit() {
    this.getdata('1');
   }

  /**
   * 获取所有机构
   */
  getdata(id: string) {
    this.mainservice.getDeptTreeCY(id).subscribe((res) => {
      if (res['State'] == 1) {
        this.alldepartmentArr = res['Data'];
      }else {
        this.toast.presentToast('暂无数据');
      }
    },err => {
      this.toast.presentToast('请求失败');
    });
  }

  itemClick(item: any,index:number) {
    
    if (this.alldepartmentArr[index]['attributes']['NodeType'] == 'Dept' && this.alldepartmentArr[index]['children'].length < 1) {
      this.mainservice.getDeptTreeCY(this.alldepartmentArr[index]['id']).subscribe((res) => {
        if (res['State'] == 1) {
           this.alldepartmentArr[index]['children'] = res['Data'];
        }else {
          this.toast.presentToast('暂无数据');
        }
      },err => {
        this.toast.presentToast('请求失败');
      });
    }else {

    }
  }

  subitemclick() {
  }

  /**
   * checkbox点击
   */
  checkboxClick(event) {

  }
}
