import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';
import { MainindexService } from '../../service/maiindex/mainindex.service';
import { CommonHelper } from '../../infrastructure/commonHelper';
import { DocumentlistPage } from '../documentlist/documentlist';

/**
 * Generated class for the MainIndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-index',
  templateUrl: 'main-index.html',
})
export class MainIndexPage implements OnInit {
   // 关闭下拉
   @ViewChild('refresher') ionRefresh: Refresher;
   titleArr = [
     { text: '收文待办', bgcolor: '#e7fae3', forecolor: '#67c554' },
     { text: '发文待办', bgcolor: '#fdeff0', forecolor: '#f87a85' },
     { text: '传阅件', bgcolor: '#e3f6fc', forecolor: '#4877fb' },
     { text: '已办工作', bgcolor: '#faf7e4', forecolor: '#f1cb14' }
   ];

   countArr: number[] = [];

   constructor(
     private mainindexservice: MainindexService,
     private nav: NavController,
     private toast: CommonHelper,
     private navCtrl: NavController
   ) {}

   ngOnInit() {
   }


   ionViewLoaded(){
    this.getdata();

   }

   /**
    * 下拉刷新
    */

   doRefresh(event) {
     this.getdata(event);
   }

   /**
    * 获取数据
    */
   getdata(event?:Refresher) {
     this.mainindexservice.getmainindexdata().subscribe(
       res => {
         if (res['State'] === 1) {
          event && event.complete && event.complete();
           const dataArr: any[] = res['Data'];
           this.countArr = [];
           for (let i = 0; i < dataArr.length; i++) {
             this.countArr[i] = dataArr[i]['Count'];
           }
           if (this.countArr.length < 4) {
             for (let j = 0; j < 4 - this.countArr.length; j++) {
               this.countArr.push(-1);
             }
           }
         } else {
          event && event.complete && event.complete();
           this.toast.presentToast('请求出错');
         }
       },
       err => {
        event && event.complete && event.complete();
         this.toast.presentToast('请求失败');
       }
     );
   }

   /**
    * 进入公文列表 1 收文 2 发文 3 传阅件
    */
   pushDocumentList(index: number) {
     if (index === 3) {
     } else {
       // 进入公文列表 1 收文 2 发文 3 传阅件
       this.navCtrl.push(DocumentlistPage,{
         type: ++index,

       });
     }
   }

}
