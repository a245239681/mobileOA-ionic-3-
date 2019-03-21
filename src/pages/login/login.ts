import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { loginModel, LoginService } from '../../service/login/login.service';
import { UserInfo } from '../../infrastructure/user-info';
import { CommonHelper } from '../../infrastructure/commonHelper';
import { MainindexService } from '../../service/maiindex/mainindex.service';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;

  formErrors = {
    // 错误信息
    username: '',
    PassWord: ''
  };

  loginInfo: loginModel = {
    username: '',
    PassWord: ''
  };

  validationMessages = {
    // 错误信息模板
    username: {
      required: '用户名不能为空'
    },
    PassWord: {
      required: '密码不能为空',
      minlength: '密码不能小于3个字符'
    }
  };

  isUserNameEmpty = false;

  isPasswordEmpty = false;

  isPasswordLow = false;

  constructor(
    private loginservice: LoginService,
    private userinfo: UserInfo,
    private toast: CommonHelper,
    private fb: FormBuilder,
    private mainindexService: MainindexService,
    public navCtrl: NavController,
    private modalController: ModalController
  ) {
    this.creatForm();
  }

  creatForm() {
    this.loginForm = this.fb.group({
      username: [
        this.userinfo.GetUserName() ? this.userinfo.GetUserName() : '',
        [Validators.required]
      ],
      PassWord: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.loginForm.valueChanges.subscribe(data => {
      this.toast.onInputValueChanged(
        this.loginForm,
        this.formErrors,
        this.validationMessages
      );
    }, err =>{});
    this.toast.onInputValueChanged(
      this.loginForm,
      this.formErrors,
      this.validationMessages
    );
  }
  login(value: any) {
    console.log(value);
    if (this.isPasswordEmpty) {
      this.toast.presentToast(this.validationMessages.PassWord.required);
      return;
    }
    if (this.isUserNameEmpty) {
      this.toast.presentToast(this.validationMessages.username.required);
      return;
    }
    if (this.isPasswordLow) {
      this.toast.presentToast(this.validationMessages.PassWord.minlength);
      return;
    }
    this.loginservice.login(this.loginInfo).subscribe(res => {
      if (res['State'] === 1) {
        const userinfo = res['Data'];
        console.log(userinfo);
        /**
         * 存token 存名字 存是否是领导
         */
        this.userinfo.SetToken(userinfo['OaApiToken']);
        /** 个人信息 */
        this.userinfo.SetUserName(userinfo.Name);
        this.userinfo.SetUserDegree(userinfo.IsLeader);
        this.userinfo.Sex(userinfo.Sex);
        this.userinfo.Phone(userinfo.Phone);
        this.userinfo.Mobile(userinfo.Mobile);
        this.userinfo.DeptName(userinfo.DeptName);
        const id = userinfo.ID + '';
        this.userinfo.PersonageId(id, 'id');
        this.userinfo.Birthday(userinfo.Birthday);
        /**
         * 跳到tabs
         */
        this.navCtrl.setRoot(TabsPage);
        this.toast.presentToast(
          '欢迎登陆住房局OA管理系统！',
          'success',
          'toast'
        );
      } else {
        this.toast.presentToast(res['Message']);
      }
    }, err =>{});
  }

  onUsernameChange() {
    if (this.loginInfo.username === '') {
      this.isUserNameEmpty = true;
    } else {
      this.isUserNameEmpty = false;
    }
  }

  onPasswordChange() {
    if (this.loginInfo.PassWord === '') {
      this.isPasswordEmpty = true;
    } else {
      if (this.loginInfo.PassWord.length < 3) {
        this.isPasswordLow = true;
      } else {
        this.isPasswordLow = false;
      }
      this.isPasswordEmpty = false;
    }
  }
}
