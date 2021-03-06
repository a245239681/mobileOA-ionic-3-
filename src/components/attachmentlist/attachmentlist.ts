import { CommonHelper } from './../../infrastructure/commonHelper';
import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import {
  FileTransfer,
  FileTransferObject
} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { MainindexService } from '../../service/maiindex/mainindex.service';
import { Platform } from 'ionic-angular';
import { getFileMimeType } from '../../infrastructure/regular-expression';

@Component({
  selector: 'attachmentlist',
  templateUrl: 'attachmentlist.html'
})
export class AttachmentlistComponent {

  // 传进来的itemmodel
  @Input() itemmodel: any;

  /** 附件列表 */
  attachmentlistArr: any[] = [];

  /** 附件的下载 */
  fileTransfer: FileTransferObject;

  constructor(private mainservice: MainindexService,
    private commonHelper: CommonHelper,
    private browser: InAppBrowser,
    private platform: Platform,
    private fileOpener: FileOpener,
    private transfer: FileTransfer,
    private file: File) {
     
  }

  ngOnInit() {
    this.getattchmentlis();
  }

  /**
 * 获取附件
 */
  getattchmentlis() {
    this.mainservice.getattchmentlist(this.itemmodel['Id']).subscribe(
      res => {
        if (res['State'] === 1) {
          this.attachmentlistArr = res['Data'];
          if (this.attachmentlistArr.length === 1) {
            // 如果附件只有1条则自动打开
            this.previewerAttchment(this.attachmentlistArr[0]);
          }
        } else {
          // this.toast.presentToast('暂无数据');
        }
      },
      err => {
        this.commonHelper.presentToast('请求失败');
      }
    );
  }

  /**
   * 点击跳到浏览器浏览附件
   * @param item 1
   */
  previewerAttchment(item: any) {
    if (!this.fileTransfer) {
      this.fileTransfer = this.transfer.create();
    }
    const mimeType = getFileMimeType(item.Extended);
    if (mimeType === '') {
      this.commonHelper.presentToast('不支持该格式文件预览');
      return;
    }
    if (this.platform.is('android') || this.platform.is('ios')) {
      const uri = encodeURI(item['Url']); // 文件的地址链接
      const fileUrl =
        this.file.cacheDirectory + uri.substr(uri.lastIndexOf('/') + 1); // 文件的下载地址
      this.commonHelper.presentLoading();
      this.fileTransfer.download(uri, fileUrl).then(
        entry => {
          entry.file(data => {
            this.fileOpener
              .open(fileUrl, getFileMimeType(item.Extended))
              .then(() => this.commonHelper.dismissLoading())
              .catch(() => {
                this.commonHelper.dismissLoading();
                this.commonHelper.presentToast('不支持该格式文件预览');
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
    const browser = this.browser.create(item['Url']);
    browser.show();
  }

}
