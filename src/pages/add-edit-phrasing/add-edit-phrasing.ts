import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, ModalController, ViewController } from 'ionic-angular';
import { DailySaveModel, MainindexService } from '../../service/maiindex/mainindex.service';
import { CommonHelper } from '../../infrastructure/commonHelper';

/**
 * Generated class for the AddEditPhrasingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-add-edit-phrasing',
  templateUrl: 'add-edit-phrasing.html',
})
export class AddEditPhrasingPage {



   /** 开启页面传过来的值 */
    data: any;
   Title: String;
   text: string;
   mydata: DailySaveModel = {
     ID: '',
     Staff_ID: '',
     Amount: 0,
     Text: ''
   };
   staffId: string;
   public ale: Alert;
   constructor(
     private toast: CommonHelper,
     private nav: NavController,
     private modalController: ModalController,
     private mainservice: MainindexService,
     private viewCtrl: ViewController,
     private navParams: NavParams
   ) {
     this.data = this.navParams.data;
   }

   ngOnInit() {
     console.log(this.data);
     this.Title = this.data.title === '添加' ? '添加常用语' : '修改常用语';
     this.staffId = localStorage.getItem('id');
     if (this.data.data) {
       this.text = this.data.data.Text;
     }
   }
   // async presentAlert() {
   //   this.ale = await this.alertController.create({
   //     // header: 'Alert',
   //     // subHeader: 'Subtitle',
   //     message: '保存成功'
   //     // buttons: ['OK']
   //   });

   //   await this.ale.present();
   //   this.ale.dismiss();
   //   // setTimeout(function() {}, 2000);
   // }

   /** 保存 */
   submit() {
     console.log(this.text);
     if (this.data.data) {
       this.mydata.ID = this.data.data.ID;
       this.mydata.Staff_ID = this.staffId;
       this.mydata.Text = this.text;
       this.mainservice.DailySave(this.mydata).subscribe(res => {
         console.log(res);
         if (res === true) {
           this.toast.presentToast('编辑成功');
           this.closemodal('change');
         } else {
           this.toast.presentToast(res + '');
         }
       }, err =>{});
     } else {
       this.mydata.ID = '0';
       this.mydata.Staff_ID = this.staffId;
       this.mydata.Text = this.text;
       this.mainservice.DailySave(this.mydata).subscribe(res => {
         console.log(res);
         if (res === true) {
           this.toast.presentToast('添加成功');
           this.closemodal('change');
         } else {
           this.toast.presentToast(res + '');
         }
       }, err =>{});
     }
     // this.presentAlert();
   }
   /** 关闭模态框 */
   closemodal(data?: any) {
     this.viewCtrl.dismiss({
       result: data
     });
   }
}