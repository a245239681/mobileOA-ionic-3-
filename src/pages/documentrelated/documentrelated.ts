import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { FileTransferObject, FileTransfer } from '@ionic-native/file-transfer/ngx';
import { CommonHelper } from '../../infrastructure/commonHelper';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { getFileMimeType } from '../../infrastructure/regular-expression';
import { File } from '@ionic-native/file/ngx';
import { environment } from '../../environments/environment';
import { ApiUrlManagement } from '../../infrastructure/api-url-management';

@IonicPage()
@Component({
  selector: 'page-documentrelated',
  templateUrl: 'documentrelated.html',
})
export class DocumentrelatedPage {

  @Input() itemmodel: any;
  fileTransfer: FileTransferObject = this.transfer.create();
  type = '1';
  title: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,
    private file: File,
    private commonHelper: CommonHelper,
    private fileOpener: FileOpener,
    private transfer: FileTransfer,
    private browser: InAppBrowser,
    private modalController: ModalController
    ) {
  }

  ionViewDidLoad() {
    this.itemmodel.isRelated = true;
  }

  segmentChanged(event: any) {
    this.type = event.target.value;
    switch (event.target.value) {
      case '1':
        this.title = '办理信息';
        break;
      case '6':
        this.title = '正文';
        this.previewerAttchment(this.itemmodel['TargetId']);
        break;
    }
  }
  openDocument() {
    this.previewerAttchment(this.itemmodel['TargetId']);
  }

  /**
   * 点击跳到浏览器浏览正文
   * @param relationId Id
   */
  previewerAttchment(relationId: string) {
    const url =
      environment.url +
      ApiUrlManagement.fileViewSends +
      '?relationId=' +
      relationId;
    if (this.platform.is('android') || this.platform.is('ios')) {
      const uri = encodeURI(url); // 文件的地址链接
      const fileUrl =
        this.file.cacheDirectory + uri.substr(uri.lastIndexOf('/') + 1); // 文件的下载地址
      this.commonHelper.presentLoading();
      this.fileTransfer.download(uri, fileUrl).then(
        entry => {
          entry.file((data: any) => {
            this.fileOpener
              .open(fileUrl, getFileMimeType('pdf'))
              .then(() => this.commonHelper.dismissLoading())
              .catch(() => {
                this.commonHelper.dismissLoading();
                this.commonHelper.presentToast('文件打开失败，请安装WPS');
              }); // showOpenWithDialog使用手机上安装的程序打开下载的文件
          });
        },
        () => {
          this.commonHelper.dismissLoading();
          this.commonHelper.presentToast('文件下载失败');
        }
      );

      return;
    }
    const browser = this.browser.create(url);
    browser.show();
  }
  /** 关闭模态框 */
  closemodal(data?: any) {
    // this.modalController.dismiss({
    //   result: data
    // });
  }



}
