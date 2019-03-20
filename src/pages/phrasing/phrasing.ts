import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, ToastController, ModalController, Platform } from 'ionic-angular';
import { MainindexService } from '../../service/maiindex/mainindex.service';
import { CommonHelper } from '../../infrastructure/commonHelper';
import { AddEditPhrasingPage } from '../add-edit-phrasing/add-edit-phrasing';

/**
 * Generated class for the PhrasingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phrasing',
  templateUrl: 'phrasing.html',
})
export class PhrasingPage {

  public ale: Alert;

  /** 常用语数组 */
  myList: any;

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    private nav: NavController,
    public mainindexService: MainindexService,
    private modalController: ModalController,
    private toast: CommonHelper,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.Getoftenuse();

  }

  /** 请求常用语列表 */
  Getoftenuse() {
    this.mainindexService.getoftenuse().subscribe(r => {
      console.log(r);
      if (r['State'] === 1) {
        this.myList = r['Data'];
      }
    }, err =>{});
  }

  async presentAlert() {
    this.ale = await this.alertController.create({
      // header: 'Alert',
      // subHeader: 'Subtitle',
      message: '删除成功'
      // buttons: ['OK']
    });

    await this.ale.present();
    this.ale.dismiss();
    // setTimeout(function() {}, 2000);
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: '删除成功',
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }
  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      message: '确定删除此条常用语吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          // cssClass: 'secondary',
          handler: blah => {
            console.log('取消删除');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.mainindexService.DailyDelete(id).subscribe(res => {
              console.log(res);
              if (res === true) {
                this.toast.presentToast('删除成功');
                this.Getoftenuse();
              } else {
                this.toast.presentToast(res + '');
              }
            }, err =>{});
          }
        }
      ]
    });

    await alert.present();
  }
  /** 删除 */
  delete(id) {
    console.log(id);
    this.presentAlertConfirm(id);
  }


  /** 开启会签模态框 */
  async phrasingModal(e: string, d?: any) {
    const Data = {
      title: e,
      data: d
    };
    // componentProps 传值 d:数据
    const modal = await this.modalController.create(AddEditPhrasingPage,  Data);
    await modal.present();
    // 接收模态框传回的值
    modal.onDidDismiss(data => {

      console.log(data);
      if (data.result === 'change') {
        this.Getoftenuse();
      }
    });

  }
  ionViewWillLeave() {

  }

}
