import { Component, Input } from '@angular/core';
import { MainindexService } from '../../service/maiindex/mainindex.service';
import { CommonHelper } from '../../infrastructure/commonHelper';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the DocumentpaperComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'documentpaper',
  templateUrl: 'documentpaper.html'
})
export class DocumentpaperComponent {

  // 传进来的itemmodel
  @Input() itemmodel: any;
  attachmentlistArr: any;
  isData: boolean;
  constructor(
    private mainindexService: MainindexService,
    private toast: CommonHelper,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.RelationTree();
  }

  RelationTree() {
    this.mainindexService.RelationTree(this.itemmodel['Id']).subscribe(
      res => {
        if (res['State'] === 1) {
          this.attachmentlistArr = res['Data'];
          this.isData = this.attachmentlistArr['length'] > 0 ? true : false;
        }
      },
      err => {
        this.toast.presentToast('请求失败');
      }
    );
  }

   toDetail(d?: any) {
    // d.documenttype = 1;
    // // componentProps 传值 d:数据
    // const modal =  this.modalController.create({
    //   component: DocumentRelatedPage,
    //   componentProps: { itemmodel: d }
    // });
    //  modal.present();
    // // 接收模态框传回的值
    // const data = await modal.onDidDismiss();
  }

}
