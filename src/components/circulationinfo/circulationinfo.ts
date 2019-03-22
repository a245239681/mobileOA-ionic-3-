import { Component, Input } from '@angular/core';
import { CommonHelper } from '../../infrastructure/commonHelper';
import { MainindexService } from '../../service/maiindex/mainindex.service';


@Component({
  selector: 'circulationinfo',
  templateUrl: 'circulationinfo.html'
})
export class CirculationinfoComponent {

  @Input() itemmodel: any;

  forecolors = {
    协办部门: '#4877FB',
    传阅结果: '#F99D31',
    流转情况: '#67C554',
    领导批示: '#D1202E',
    会签意见: '#f87a85'
  };
  backcolors = {
    协办部门: '#DDF6FB',
    传阅结果: '#FDF3E6',
    流转情况: '#E1FAE4',
    领导批示: 'rgb(253,234,234)',
    会签意见: '#ffeff0'
  };

  parenteArr = [];

  constructor(
    private mainservice: MainindexService,
    private toast: CommonHelper) {

  }

  ionViewDidLoad(){
    this.getdata();
  }

  /**
   * 获取数据
   */
  getdata() {
    if (this.itemmodel.ProcessType === 2) {
      this.mainservice.getReciveDetailInfo(this.itemmodel['Id']).subscribe(
        res => {
          if (res['State'] === 1) {
            this.parenteArr = res['Data'];
            if (this.parenteArr) {
              this.parenteArr.forEach(
                (v, i) => (v.hidden = v.children.length === 0 || i > 0)
              );
            }
            /** IOS需要把-转换为/否则会报错 */
            // this.parenteArr = this.parenteArr.map(v => {
            //   v.children = v.children.map(cv => {
            //     cv.SignDate = cv.SignDate
            //       ? cv.SignDate.replace(/-/gi, '/')
            //       : cv.SignDate;
            //     cv.Date = cv.Date ? cv.Date.replace(/-/gi, '/') : cv.Date;
            //     return cv;
            //   });
            //   return v;
            // });
            /** 改进，把时间转换封装 */
            this.parenteArr.forEach(e => {
              e.children.forEach(el => {
                el.SignDate = this.sjdate(el.SignDate);
                el.Date = this.sjdate(el.Date);
              });
            });
          } else {
            this.toast.presentToast('暂无数据');
          }
        },
        err => {
          this.toast.presentToast('请求失败');
        }
      );
    } else if (this.itemmodel.ProcessType === 1) {
      this.mainservice.Send_ActDetailTree(this.itemmodel['Id']).subscribe(
        res => {
          if (res['State'] === 1) {
            this.parenteArr = res['Data'];
            if (this.parenteArr) {
              this.parenteArr.forEach(
                (v, i) => (v.hidden = v.children.length === 0 || i > 0)
              );
            }
            /** IOS需要把-转换为/否则会报错 */
            // this.parenteArr = this.parenteArr.map(v => {
            //   v.children = v.children.map(cv => {
            //     cv.SignDate = cv.SignDate
            //       ? cv.SignDate.replace(/-/gi, '/')
            //       : cv.SignDate;
            //     cv.Date = cv.Date ? cv.Date.replace(/-/gi, '/') : cv.Date;
            //     return cv;
            //   });
            //   return v;
            // });
            /** 改进，把时间转换封装 */
            this.parenteArr.forEach(e => {
              e.children.forEach(el => {
                el.SignDate = this.sjdate(el.SignDate);
                el.Date = this.sjdate(el.Date);
              });
            });
          } else {
            this.toast.presentToast('暂无数据');
          }
        },
        err => {
          this.toast.presentToast('请求失败');
        }
      );
    }
  }

  // 转换
  sjdate(dos: any) {
    dos = dos ? dos.replace(/-/g, '/') : dos;
    // dos = dos.substring(0, dos.length - 3);
    return dos;
  }

  /**
   * 点击展示
   */
  getsubtitle(item) {
    // var item = this.parenteArr[itemid];
    // 如果有数据了就不请求了
    if (item['children'].length > 0) {
      item.hidden = !item.hidden;
    } else {
      if (this.itemmodel.ProcessType === 2) {
        this.mainservice
          .getReciveDetailInfo(this.itemmodel['Id'], item['ID'])
          .subscribe(
            res => {
              if (res['State'] === 1) {
                item['children'] = res['Data'];
                item.hidden = item['children'].length === 0;
                if (res.Data.length === 0) {
                  this.toast.presentToast('该模块下暂无数据');
                } else {
                  /** IOS需要把-转换为/否则会报错 */
                  // item['children'] = item['children'].map(cv => {
                  //   cv.SignDate = cv.SignDate
                  //     ? cv.SignDate.replace(/-/gi, '/')
                  //     : cv.SignDate;
                  //   cv.Date = cv.Date ? cv.Date.replace(/-/gi, '/') : cv.Date;
                  //   return cv;
                  // });
                  /** 改进，把时间转换封装 */
                  item['children'].forEach(e => {
                    e.SignDate = this.sjdate(e.SignDate);
                    e.Date = this.sjdate(e.Date);
                  });
                }
              } else {
                this.toast.presentToast('暂无数据');
              }
            },
            err => {
              this.toast.presentToast('请求失败');
            }
          );
      } else if (this.itemmodel.ProcessType === 1) {
        this.mainservice
          .Send_ActDetailTree(this.itemmodel['Id'], item['ID'])
          .subscribe(
            res => {
              if (res['State'] === 1) {
                item['children'] = res['Data'];
                item.hidden = item['children'].length === 0;
                if (res.Data.length === 0) {
                  this.toast.presentToast('该模块下暂无数据');
                } else {
                  /** IOS需要把-转换为/否则会报错 */
                  // item['children'] = item['children'].map(cv => {
                  //   cv.SignDate = cv.SignDate
                  //     ? cv.SignDate.replace(/-/gi, '/')
                  //     : cv.SignDate;
                  //   cv.Date = cv.Date ? cv.Date.replace(/-/gi, '/') : cv.Date;
                  //   return cv;
                  // });
                  /** 改进，把时间转换封装 */
                  item['children'].forEach(e => {
                    e.SignDate = this.sjdate(e.SignDate);
                    e.Date = this.sjdate(e.Date);
                  });
                }
              } else {
                this.toast.presentToast('暂无数据');
              }
            },
            err => {
              this.toast.presentToast('请求失败');
            }
          );
      }
    }
  }

}
