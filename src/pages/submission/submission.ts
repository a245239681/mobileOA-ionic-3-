import { CountersignPage } from './../countersign/countersign';
import { SendactiontreePage } from './../sendactiontree/sendactiontree';
import { SecretinfoadvicePage } from './../secretinfoadvice/secretinfoadvice';
import { DocumentlistPage } from './../documentlist/documentlist';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Alert } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonHelper } from '../../infrastructure/commonHelper';
import { MainindexService, saveadviceModel, CommitModel } from '../../service/maiindex/mainindex.service';
import { UserInfo } from '../../infrastructure/user-info';
import { HaveoverpersonselectPage } from '../haveoverpersonselect/haveoverpersonselect';
import { ReturnbackPage } from '../returnback/returnback';
import { EndactionPage } from '../endaction/endaction';
import { PersonselectPage } from '../personselect/personselect';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { SignaturepadPage } from '../signaturepad/signaturepad';
import { SigsusscesPage } from '../sigsussces/sigsussces';

/**
 * Generated class for the SubmissionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-submission',
  templateUrl: 'submission.html',
})
export class SubmissionPage {

  // 传进来的公文模型----收发文类型可通过itemmodel['documenttype'] 拿到 1 收文 2 发文
  itemmodel: any;
  /** 是否是发文领导 */
  IsOwner = false;

  adviceForm: FormGroup;

  /**
   * 保存意见用的Type
   */
  attitudeType: string;

  /**
   * 当前框里的意见
   */
  CurAttitude: string;

  /**
   * 提交按钮标题
   */
  handinButtonTitle: string;

  /**
   * 是否展示提交并分发
   */
  IsShowHandinAndGiveButton = false;

  // 发文步骤名称
  sendStepName: string;
  /**
   * 常用语数组
   */
  oftenuseArr: any[] = [];

  alertVC: Alert;

  modal: any;

  base64: string;

  showSign = false;

  formErrors = {
    // 错误信息
    advice: ''
  };

  validationMessages = {
    // 错误信息模板
    advice: {
      required: '意见不能为空'
    }
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private toast: CommonHelper,
    private nav: NavController,
    private mainservice: MainindexService,
    private userinfo: UserInfo,
    public alertController: AlertController,
    public modalController: ModalController
  ) {

    this.itemmodel = this.navParams.get('item');
    if (this.userinfo.GetUserDegree() === 'true') {
      // 收文
      if (this.itemmodel['documenttype'] == 1) {
        this.handinButtonTitle = '提交并返回办理人';
        // 是否展示提交并分发文件
        this.IsShowHandinAndGiveButton = true;
      }
      // 发文
      else {
        this.handinButtonTitle = '签发';
        this.IsShowHandinAndGiveButton = false;
        this.showSign = true;
      }
    } else {
      this.handinButtonTitle = '提交';
    }
    this.getattitudeType();

    if (
      this.itemmodel.ProcessType === 1 &&
      this.userinfo.GetUserDegree() === 'true'
    ) {
      this.IsOwner = true;
    } else {
      this.IsOwner = false;
    }
    this.creatForm();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmissionPage');
  }

  creatForm() {
    this.adviceForm = this.fb.group({
      advice: ['', [Validators.required]]
    });
    this.adviceForm.valueChanges.subscribe(data => {
      // this.toast.onInputValueChanged(this.adviceForm, this.formErrors, this.validationMessages);
    });
    // this.toast.onInputValueChanged(this.adviceForm, this.formErrors, this.validationMessages);
  }

  /**
   * 点击提交或者保存进入相应的方法
   // tslint:disable-next-line:no-redundant-jsdoc
   // @param type
   * @param value 获取到的输入框的值
   */
  handleAdvice(type: number, value: any) {
    if (type === 0) {
      this.saveadvice(this.CurAttitude);
    } else {
      this.handleInfo(this.CurAttitude);
    }
  }
  /** 一般移交 */
  async handOver(value) {
    if (!value['advice']) {
      this.toast.presentToast('请先填写意见');
      return false;
    } else {
      if (this.itemmodel.ProcessType === 2) {
        if (
          this.itemmodel.IsPrimaryDept ||
          this.itemmodel.CoorType === 1 ||
          this.userinfo.GetUserDegree() === 'true'
        ) {
          this.mainservice.GetFlow_YJ_DeptStaffTree().subscribe(
            (data: any) => {
              // if (data['State'] === 1) {
              let tempArr = data.Data;

              if (!tempArr) {
                tempArr = [];
              }
              this.navCtrl.push(HaveoverpersonselectPage, {
                item: this.itemmodel,
                hasSelected: tempArr,
              });

              this.saveadvice(value['advice']);
            },
            () => {
              this.toast.presentToast('请求失败');
            }
          );
        } else {
          this.toast.presentToast('当前环节无法移交');
        }
      } else if (this.itemmodel.ProcessType === 1) {
        // let commitType: string;
        this.mainservice
          .ValidMove(
            this.itemmodel['Id'],
            this.itemmodel.ProcessType,
            this.itemmodel.CoorType
          )
          .subscribe(res => {
            if (res.State === 1) {
              // commitType = '60';
              this.mainservice.GetFlow_YJ_DeptStaffTree().subscribe(
                (data: any) => {
                  // if (data['State'] === 1) {
                  let tempArr = data.Data;

                  if (!tempArr) {
                    tempArr = [];
                  }
                  this.navCtrl.push(HaveoverpersonselectPage, {
                    item: this.itemmodel,
                    hasSelected: tempArr,
                  });
                  this.saveadvice(value['advice']);
                },
                () => {
                  this.toast.presentToast('请求失败');
                }
              );
            } else {
              this.toast.presentToast(res['Message']);
            }
          });
      }
    }
  }
  /** 退回 */
  sendBack(value) {
    if (!value['advice']) {
      this.toast.presentToast('请先填写意见');
      return false;
    } else {
      this.mainservice
        .ValidBack(
          this.itemmodel['Id'],
          this.itemmodel['ProcessType'],
          this.itemmodel['CoorType']
        )
        .subscribe(
          res => {
            if ((<any>res).State === 1) {

              this.navCtrl.push(ReturnbackPage, {
                item: this.itemmodel
              });
              this.saveadvice(value['advice']);
            } else {
              this.toast.presentToast(res['Data']);
            }
          },
          () => {
            this.toast.presentToast('请求失败');
          }
        );
    }
  }
  /**呈其他局领导 */
  ownerHandOver(value) {
    if (!value['advice']) {
      this.toast.presentToast('请先填写意见');
      return false;
    } else {
      this.mainservice
        .ValidLeader2Leader(this.itemmodel['Id'])
        .subscribe(res => {
          if (res === 'ok') {
            this.mainservice.GetFlow_YJ_DeptStaffTree().subscribe(
              (data: any) => {
                // if (data['State'] === 1) {
                let tempArr = data.Data;

                if (!tempArr) {
                  tempArr = [];
                }
                this.navCtrl.push(HaveoverpersonselectPage, {
                  item: this.itemmodel,
                  hasSelected: tempArr,
                });
                this.saveadvice(value['advice']);
              },
              () => {
                this.toast.presentToast('请求失败');
              }
            );
          } else {
            this.toast.presentToast(res['Message']);
          }
        });
    }
  }
  ngOnInit() { }

  /**
   * 获取保存意见需要的attitudeType open接口
   */
  getattitudeType() {
    // if (this.itemmodel['IsPrimaryDept'] == true) {
    //   this.itemmodel['CoorType'] = 1;
    // }
    this.mainservice
      .getattitudeType(
        this.itemmodel['Id'],
        this.itemmodel['ProcessType'],
        this.itemmodel['CoorType']
      )
      .subscribe(
        res => {
          this.getoftenuse();
          if (res['State'] === 1) {
            this.attitudeType = res['Data']['Authority']['CurAttitudeType']; // 保存意见用到的type
            this.CurAttitude = res['Data']['Authority']['CurAttitude']; // 框里的意见
            this.sendStepName = res['Data']['Authority']['Name']; // 发文步骤名称
          }
        },
        err => {
          this.toast.presentToast('请求失败');
        }
      );
  }

  /**
   *
   * @param content 常用语
   */
  getoftenuse() {
    this.mainservice.getoftenuse().subscribe(
      res => {
        if (res['State'] === 1) {
          this.oftenuseArr = res['Data'];
        }
      },
      err => {
        this.toast.presentToast('请求失败');
      }
    );
  }

  /**
   * 保存意见
   */
  async saveadvice(content: string) {
    if (!this.CurAttitude) {
      this.toast.presentToast('请填写意见');
      return;
    }

    if (this.CurAttitude && this.CurAttitude.length <= 0) {
      this.toast.presentToast('请填写意见');
      return;
    }
    // 发文流程 如果是处于二校之后的步骤就直接提示到PC端处理---特殊情况
    if (
      this.sendStepName == '二校' ||
      this.sendStepName == '文印' ||
      this.sendStepName == '盖章'
    ) {
      this.toast.presentToast('请到PC端进行处理');
      return;
    }

    if (this.attitudeType) {
      const savemodel = <saveadviceModel>{
        attitudeType: this.attitudeType,
        content: content,
        coorType: this.itemmodel['CoorType'],
        processType: this.itemmodel['ProcessType'],
        relationId: this.itemmodel['Id'],
        skipValid: false,
        HandSign: this.base64
      };
      await this.mainservice.saveadvice(savemodel).subscribe(
        res => {
          if (res['State'] === 1) {
            this.toast.presentToast('保存意见成功');
          }
        },
        err => {
          this.toast.presentToast('请求失败');
        }
      );
    } else {
      // this.toast.presentToast('缺少参数');
    }
  }

  /**
   * 提交
   */
  handleInfo(content: string) {
    if (this.itemmodel['documenttype'] == 3) {
      this.mainservice
        .SetDoRead(this.itemmodel['Id'], content)
        .subscribe(res => {
          this.toast.presentToast('操作成功');
          //this.route.navigate(['tabs']);
          this.navCtrl.popTo(DocumentlistPage);
        });
      return;
    }

    // 发文流程 如果是处于二校之后的步骤就直接提示到PC端处理
    if (
      this.sendStepName == '二校' ||
      this.sendStepName == '文印' ||
      this.sendStepName == '盖章'
    ) {
      this.toast.presentToast('请到PC端进行处理');
      return;
    }

    // 提交用到
    if (this.attitudeType) {
      const savemodel = <saveadviceModel>{
        attitudeType: this.attitudeType,
        content: content,
        coorType: this.itemmodel['CoorType'],
        processType: this.itemmodel['ProcessType'],
        relationId: this.itemmodel['Id'],
        skipValid: false,
        HandSign: this.base64
      };

      this.mainservice.saveadvice(savemodel).subscribe(
        res => {
          // 收文流程
          if (this.itemmodel['documenttype'] == 1) {
            // 身份是领导的情况
            if (this.IsShowHandinAndGiveButton) {
              this.mainservice.handinandbackman(this.itemmodel['Id']).subscribe(
                res => {
                  if (res['State'] == 1) {
                    this.itemmodel['commitType'] = '20';
                    // 是否在人员机构展示 下一步
                    this.itemmodel['IsShowNextStep'] = false;
                    this.pushNextStep();
                  }
                },
                err => {
                  this.toast.presentToast('请求失败');
                }
              );
            }
            // 不是领导的情况
            else {
              // 如果是协办的话点提交的接口就OK
              if (this.itemmodel['CoorType'] == 1) {
                this.handinxieban();
              } else {
                // 调用提交的接口-----validnext
                this.mainservice
                  .getToastType(
                    this.itemmodel['Id'],
                    this.itemmodel['ProcessType'],
                    this.itemmodel['CoorType']
                  )
                  .subscribe(
                    res => {
                      if (res['State'] == 1) {
                        // 协办
                        if (res['Ok'] == 'ok' && res['Type'] == 'BMCL') {
                          this.handinxieban();
                        }
                        // 结束
                        else if (res['Type'] == 400) {
                          // 弹出要结束的模态框 跳到下一步  展示结束步骤
                          this.presentEndAlert();
                        }
                        // 分件
                        else if (res['Type'] == 300) {
                          this.handinandgiveFile();
                        }
                        // 拟办回到办公室
                        else if (res['Type'] == 610) {
                          // 610直接commit
                          this.itemmodel['commitType'] = 610;
                          this.mainservice
                            .commit_610(
                              this.itemmodel['Id'],
                              this.itemmodel['commitType'],
                              this.itemmodel['ProcessType'],
                              this.itemmodel['CoorType']
                            )
                            .subscribe(res => {
                              if (res['State'] == 1) {
                                this.toast.presentToast('提交成功');
                                this.navCtrl.popTo(DocumentlistPage);
                                //this.route.navigate(['tabs']);
                              }
                            });
                        }
                        // 正常流程提交
                        else {
                          // 增加一个模态框的type的字段
                          this.itemmodel['commitType'] = res['Type'];
                          this.pushNextStep();
                        }
                      }
                    },
                    err => {
                      this.toast.presentToast(res['Message']);
                    }
                  );
              }
            }
          }

          // 发文流程
          else if (this.itemmodel['documenttype'] == 2) {
            // this.toast.presentToast('发文暂不处理');
            if (this.itemmodel['CoorType'] !== 3) {
              this.mainservice
                .getToastType(
                  this.itemmodel['Id'],
                  this.itemmodel['ProcessType'],
                  this.itemmodel['CoorType']
                )
                .subscribe(res => {
                  if (res['State'] == 1) {
                    this.itemmodel['commitType'] = res['Type'];

                    if (this.userinfo.GetUserDegree() === 'true') {
                      this.goSign();
                      return;
                    }

                    if (this.userinfo.GetUserDegree() === 'true') {
                      this.toast.presentToast('领导签发');
                      return;
                    }

                    // 如果步骤名称是保密信息意见
                    if (
                      this.sendStepName == '保密信息意见' ||
                      this.sendStepName == '公开信息意见'
                    ) {
                      this.navCtrl.push(SecretinfoadvicePage, {
                        item: this.itemmodel,
                        title: this.sendStepName
                      })
                      return;
                    }
                    this.navCtrl.push(SendactiontreePage, {
                      item: this.itemmodel
                    });
                  }
                });
            } else {
              // 赋值给提交对象
              const Data = {
                /** 业务Id */
                id: this.itemmodel.Id,
                nextActionId: 0,
                isSendMsg: false,
                isSnedSms: false,
                nextUserId: '',
                primaryDeptId: '',
                leaders: [],
                /** 勾选id数组 */
                cooperaters: [],
                readers: [],
                commitType: 0,
                /** 操作业务的获取 */
                coorType: this.itemmodel.CoorType,
                count: 0,
                /** 操作业务的获取 */
                processType: this.itemmodel.ProcessType
              };
              this.huiqian(Data);
            }
          }
        },
        err => {
          this.toast.presentToast('保存意见失败');
        }
      );
    } else {
      // this.toast.presentToast('缺少参数');
    }
  }

  /** 弹出提示 */
  async huiqian(Data) {
    this.alertVC = await this.alertController.create({
      title: '提示',
      message: '该提交将会将结束这条公文的处理，点击【确定】进行提交，点击【取消】取消提交。',
      buttons: [
        {
          text: '确定',
          cssClass: 'secondary',
          handler: () => {
            this.Commithq(Data);
          }
        },
        {
          text: '取消',
          role: 'cancle',
          cssClass: 'secondary',
          handler: () => { }
        }
      ]
    });
    this.alertVC.present();
  }

  Commithq(Data: any) {
    this.mainservice.commit(Data).subscribe(
      r => {
        if (r['State'] === 1) {
          this.toast.presentToast('提交成功');
          this.navCtrl.popTo(DocumentlistPage);
        } else {
          this.toast.presentToast(r['Message']);
        }
      },
      () => {
        this.toast.presentToast('请求失败');
      }
    );
  }

  /**
   * 进协办接口处理
   */
  handinxieban() {
    this.mainservice
      .xiebanhandin(this.itemmodel['Id'], this.itemmodel['CoorType'])
      .subscribe(
        res => {
          if (res['State'] === 1) {
            this.toast.presentToast('协办提交成功');
            // 返回列表
            //this.route.navigate(['tabs']);
            this.navCtrl.popTo(DocumentlistPage);
          }
        },
        err => {
          this.toast.presentToast('协办提交失败');
        }
      );
  }

  /**
   *
   * @param index 弹出结束提示
   */
  async presentEndAlert() {
    this.alertVC = await this.alertController.create({
      title: '提示',
      message:
        '该提交将会将您的最后一条意见作为部门意见，点击【确定】进行提交，点击【取消】取消提交。',
      buttons: [
        {
          text: '确定',
          cssClass: 'secondary',
          handler: () => {
            this.itemmodel['commitType'] = 400;
            this.navCtrl.push(EndactionPage, {
              item: this.itemmodel
            });
          }
        },
        {
          text: '取消',
          role: 'cancle',
          cssClass: 'secondary',
          handler: () => { }
        }
      ]
    });
    this.alertVC.present();
  }

  /**
   * 610直接commit
   */

  /**
   * 提交并分发文件 跳到下一步
   */
  handinandgiveFile() {
    this.itemmodel['commitType'] = '300';
    if (this.itemmodel['commitType'] == 300) {
      this.itemmodel['IsShowNextStep'] = false;
    }
    this.pushNextStep();
  }

  /**
   * 跳到下一步时把上一个人选好的人的数据传下去--正常跳转进入下一步选人
   */
  async pushNextStep() {
    this.mainservice
      .commitSimulateEnd(
        this.itemmodel.Id,
        this.itemmodel.ProcessType,
        this.itemmodel.CoorType
      )
      .subscribe(
        (data: any) => {
          var tempArr = data.Data;
          if (!tempArr) {
            tempArr = [];
          }
          //把下一步的数据清掉
          tempArr.Leaders = [];
          this.navCtrl.push(PersonselectPage, {
            item: this.itemmodel,
            hasSelected: tempArr
          });
        },
        () => {
          this.toast.presentToast('请求失败');
        }
      );
  }




  async goSign() {
    this.presentModal();
  }

  async presentModal() {

    this.modal = await this.modalController.create(SignaturepadPage);
    await this.modal.present();
    const obj = await this.modal.onDidDismiss();
    if (obj.data.res) {
      this.base64 = obj.data.res;
      const savemodel = <saveadviceModel>{
        attitudeType: this.attitudeType,
        content: this.CurAttitude,
        coorType: this.itemmodel['CoorType'],
        processType: this.itemmodel['ProcessType'],
        relationId: this.itemmodel['Id'],
        skipValid: false,
        HandSign: this.base64
      };

      this.mainservice.saveadvice(savemodel).subscribe(
        res => {
          if (res['State'] === 1) {
            const comitmodel = <CommitModel>{
              commitType: 30,
              coorType: this.itemmodel['CoorType'],
              processType: this.itemmodel['ProcessType'],
              id: this.itemmodel['Id']
            };

            this.mainservice.commit(comitmodel).subscribe(
              data => {
                if (data['State'] === 1) {
                  this.navCtrl.push(SigsusscesPage);

                } else {
                  this.toast.presentToast('签发失败');
                }
              },
              err => {
                this.toast.presentToast('签发失败');
              }
            );
          } else {
            this.toast.presentToast('签发失败');
          }
        },
        err => {
          this.toast.presentToast('签发失败');
        }
      );
    }
  }

  /**
   * 点击常用语
   */
  gettheoftenuse(index: number) {
    this.CurAttitude = this.oftenuseArr[index]['Text'];
  }


  /** 开启会签模态框 */
  async countersignModal() {
    // componentProps 传值 d:数据
    const modal = await this.modalController.create(CountersignPage, {
      data: this.itemmodel
    });
    await modal.present();
    // 接收模态框传回的值
    //const data = await modal.onDidDismiss();   

  }
}
