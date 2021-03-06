import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import {
  FileTransfer,
  FileTransferObject
} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CommonHelper } from '../../infrastructure/commonHelper';
import { MainindexService } from '../../service/maiindex/mainindex.service';
import { ApiUrlManagement } from '../../infrastructure/api-url-management';
import { environment } from '../../environments/environment';
import { getFileMimeType } from '../../infrastructure/regular-expression';
import { SubmissionPage } from '../submission/submission';

@IonicPage()
@Component({
  selector: 'page-documentdetail',
  templateUrl: 'documentdetail.html',
})
export class DocumentdetailPage {

  

  /**
   * 列表传进来的item
   */
  itemmodel: any;

  // 标题切换
  title = '办理信息';

  /**
   * 1 办理信息 2 流转信息 3 附件列表  4 办文笺 5 发文笺
   */
  type = '1';

  // 收发文类型 1 收文 2 发文 3 传阅 4 已办收文 5 已办发文 6 正文 7 相关公文
  documenttype: number;

  fileTransfer: FileTransferObject;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private browser: InAppBrowser,
    private fileOpener: FileOpener,
    private file: File,
    private transfer: FileTransfer,
    private commonHelper: CommonHelper,
    private mainindexService: MainindexService
  ) {

    this.itemmodel = navParams.get('item');
   
  }

  ionViewDidLoad() {
    //如果是传阅件的时候
    if (this.itemmodel['documenttype'] == 3) {
      this.mainindexService
        .SetDoRead(this.itemmodel['Id'], '')
        .subscribe(res => {
        });
    }
  }

  nbyj() {
    if (this.type === '1') {
      if (
        this.itemmodel['Operationlist'] !== '已办收文' &&
        this.itemmodel['Operationlist'] !== '已办发文'
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  segmentChanged(event: any) {
    this.type = event.value;
    console.log(this.type);
    switch (event.value) {
      case '1':
        this.title = '办理信息';
        break;
      case '2':
        this.title = '流转信息';
        break;
      case '3':
        this.title = '附件管理';
        break;
      case '4':
        this.title = '办文签';
        break;
      case '5':
        this.title = '发文签';
        break;
      case '6':
        this.title = '正文';
        this.previewerAttchment(this.itemmodel['Id']);
        break;
      default:
        this.title = '相关公文';
    }
  }

  openDocument() {
    this.previewerAttchment(this.itemmodel['Id']);
  }

  /**
   * 点击跳到浏览器浏览正文
   * @param relationId Id
   */
  previewerAttchment(relationId: string) {
    if (!this.fileTransfer) {
      this.fileTransfer = this.transfer.create();
    }
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

  pushtoadvice() {
    this.itemmodel['IsShowNextStep'] = true;
    this.navCtrl.push(SubmissionPage,{
      item: this.itemmodel
    })
  }
  getBack(item) {
    // this.mainindexService
    //   .Retrieve(item['Id'], item['ProcessType'], item['CoorType'])
    //   .subscribe(res => {
    //     if (res === 'ok') {
    //       this.nav.navigateBack(['havedonework']);
    //     }
    //   });
  }

}
