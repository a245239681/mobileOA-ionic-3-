import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { UpdateStaffInfoModel, MainindexService } from '../../service/maiindex/mainindex.service';
import { CommonHelper } from '../../infrastructure/commonHelper';
import { UserInfo } from '../../infrastructure/user-info';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {

  item: any;
  mima = '';
  myData: UpdateStaffInfoModel = {};
  sub: any;
  constructor(
    private nav: NavController,

    private mainindexservice: MainindexService,
    private toast: CommonHelper,
    private userinfo: UserInfo,
    private platform: Platform,
    private navParams: NavParams
  ) {
    this.item = this.navParams.get('item');
    if(!this.item) return;
    this.myData = {
      id: this.item.id,
      newPassword: '',
      /** 电话号码 */
      phone: this.item.Phone,
      /** 手机号码 */
      mobile: this.item.Mobile,
      /** 性别 */
      sex: this.item.Sex,
      /** 生日 */
      birthday: this.item.Birthday
    };
    if (!this.myData.sex) {
      this.myData.sex = '';
    }
    if (!this.myData.birthday) {
      this.myData.birthday = '';
    }
  }

  ngOnInit() {
    // console.log(this.myData);
    // if (this.platform.is("android")){
    //   this.sub = this.platform.backButton.subscribeWithPriority(9999, () => {
    //   // this.nav.pop();
    //   // return true;
    //   this.nav.back();
    // });
    // }

  }

  /** 修改密码 */
  Confirm() {
    if (this.myData.newPassword !== this.mima) {
      this.toast.presentToast('两次密码不一致');
    } else {
      console.log(1);
      this.mainindexservice.UpdateStaffInfo(this.myData).subscribe(
        r => {
          if (r['State'] === 1) {
            this.userinfo.removeToken();
            this.nav.setRoot(LoginPage);
            this.toast.presentToast('修改成功');
          } else {
            this.toast.presentToast(r['Data']);
          }
        },
        () => {
          this.toast.presentToast('请求失败');
        }
      );
    }
  }

  /** 返回 */
  canGoBack() {
    // this.backState = true;
    this.nav.pop();
  }

  ionViewWillLeave() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    // if (!this.backState){
    //   this.nav.back();
    //   this.backState = true;
    //   return false;
    // }
    // console.log('23123123');
  }

}
