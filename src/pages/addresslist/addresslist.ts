import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainindexService } from '../../service/maiindex/mainindex.service';
import { CommonHelper } from '../../infrastructure/commonHelper';

/**
 * Generated class for the AddresslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addresslist',
  templateUrl: 'addresslist.html',
})
export class AddresslistPage implements OnInit{

  title = '通讯录';
  items = [];
  constructor(
    private nav: NavController,
    private mainindexservice: MainindexService,
    private toast: CommonHelper,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getMailList();
  }

  /**
   * 获取通讯录数据列表
   */
  getMailList() {

    // this.mainindexservice.getMaliList().subscribe(res => {
    //   if (res.State === 1) {

    //     this.items = res.Data[0].children;
    //     console.log(this.items);
    //   }
    // });
  }

  /**
   * 查看当前部门下的相关人员
   */
  mailShow(item: any, dept: any) {
    console.log(item);
    console.log(dept);
    this.navCtrl.push('mail-list', {
      queryParams: {
        item: JSON.stringify(item),
        dept: JSON.stringify(dept)
      }
    });
  }

}
