import { ChangepasswordPage } from './../changepassword/changepassword';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert, Platform, App } from 'ionic-angular';
import { UserInfo } from '../../infrastructure/user-info';
import { CommonHelper } from '../../infrastructure/commonHelper';
import { AppVersion } from '@ionic-native/app-version';
import { LoginPage } from '../login/login';
import { QrCorePage } from '../qr-core/qr-core';
import { PersonalInformationPage } from '../personal-information/personal-information';
import { PhrasingPage } from '../phrasing/phrasing';
/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage implements OnInit {

  alertVC: Alert;
  /** 个人信息 */
  personaldetails = {
    /** 性别 */
    Sex: this.userinfo.getSex(),
    /** 电话号码 */
    Phone: this.userinfo.getPhone(),
    /** 手机号码 */
    Mobile: this.userinfo.getMobile(),
    /** 用户名 */
    GetUserName: this.userinfo.GetUserName(),
    /** 所属部门 */
    DeptName: this.userinfo.getDeptName(),
    /** 个人Id */
    id: this.userinfo.getPersonageId(),
    /** 生日 */
    Birthday: this.userinfo.getBirthday()
  };
  versionCode: any;
  constructor(
    private userinfo: UserInfo,
    private navCtrl: NavController,
    private platform: Platform,
    public alertController: AlertController,
    private toast: CommonHelper,
    private appVersion: AppVersion,
    private app: App
  ) {}

  ngOnInit() {

    // console.log(this.personaldetails);

    // this.versionCode = this.versionCode['__zone_symbol__value'];
    console.log(this.versionCode);
  }

  ionViewDidLoad(){
    this.platform.ready().then(v =>{

     if(! this.platform.is('moboleweb')){

      //  this.appVersion.getVersionCode().then(value => {
      //    this.versionCode =
      //      (value + '').indexOf('.') > -1 ? value.toString() : value + '.0';
      //  });
     }
    })
  }

  /** 注销 */
  logout() {
    this.userinfo.removeToken();
   this.app.getRootNav().setRoot(LoginPage);
    this.toast.presentToast('注销成功,感谢您的使用！');
  }

  /** 修改密码 */
  Changepassword() {
    this.navCtrl.push(ChangepasswordPage, {
      queryParams: {
        item: JSON.stringify(this.personaldetails)
      }
    });
  }
  /** 跳转到常用语设置 */
  toPhrasing() {
    this.navCtrl.push(PhrasingPage, {
      queryParams: {
        item: JSON.stringify(this.personaldetails)
      }
    });
  }
  /** 跳转到二维码 */
  toQr() {
    this.navCtrl.push(QrCorePage, {
      queryParams: {
        item: JSON.stringify(this.personaldetails)
      }
    });
  }
  /** 详情 */
  GoDetails() {
    this.navCtrl.push(PersonalInformationPage, {
      queryParams: {
        item: JSON.stringify(this.personaldetails)
      }
    });
  }

  /**
   *  注销
   * @param index 弹出提示
   */
  async presentEndAlert() {
    this.alertVC = await this.alertController.create({
      title: '提示',
      message: '是否确定注销当前用户登陆？',
      buttons: [
        {
          text: '确定',
          cssClass: 'secondary',
          handler: () => {
            this.logout();
          }
        },
        {
          text: '取消',
          role: 'cancle',
          cssClass: 'secondary',
          handler: () => {}
        }
      ]
    });
    this.alertVC.present();
  }

}
