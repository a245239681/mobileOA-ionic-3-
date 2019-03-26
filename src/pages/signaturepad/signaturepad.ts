import { Component, ViewChild, Output } from '@angular/core';
import { IonicPage, NavController, NavParams, NavOptions, ModalController, ViewController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

/**
 * Generated class for the SignaturepadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signaturepad',
  templateUrl: 'signaturepad.html',
})
export class SignaturepadPage {

  @ViewChild(SignaturePad) public signaturePad: SignaturePad;
  @Output() signatureImage: string;

  public signaturePadOptions: Object = {
    minWidth: 2,
    canvasWidth: 340,
    canvasHeight: 200
  };
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  canvasResize() {
    const canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 2);
    this.signaturePad.set('canvasWidth', 340);

    this.signaturePad.set('canvasHeight', 500);
  }

  ngAfterViewInit() {
    this.signaturePad.clear();
    this.canvasResize();
  }

  drawCancel() {
    this.viewCtrl.dismiss({
      res: false
    });
  }

  drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    this.rotateBase64Img(this.signatureImage,90,arg0 => {
      this.viewCtrl.dismiss({
        res: arg0
      }); 
    });
  }

  drawClear() {
    this.signaturePad.clear();
  }

  rotateBase64Img(src: string, edg: number, callback: (arg0: string) => void) {
    const canvas = document.createElement('canvas');
    
    const ctx = canvas.getContext('2d');

    let imgW: number; // 图片宽度
    let imgH: number; // 图片高度
    let size: number; // canvas初始大小

    if (edg % 90 !== 0) {
      throw new Error('旋转角度必须是90的倍数!');
    }
    edg = (edg % 360) + 360;
    const quadrant = (edg / 90) % 4; // 旋转象限
    const cutCoor = { sx: 0, sy: 0, ex: 0, ey: 0 }; // 裁剪坐标

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = src;

    image.onload = function() {
      imgW = image.width;
      imgH = image.height;
      size = imgW > imgH ? imgW : imgH;

      canvas.width = size * 2;
      canvas.height = size * 2;
      switch (quadrant) {
        case 0:
          cutCoor.sx = size;
          cutCoor.sy = size;
          cutCoor.ex = size + imgW;
          cutCoor.ey = size + imgH;
          break;
        case 1:
          cutCoor.sx = size - imgH;
          cutCoor.sy = size;
          cutCoor.ex = size;
          cutCoor.ey = size + imgW;
          break;
        case 2:
          cutCoor.sx = size - imgW;
          cutCoor.sy = size - imgH;
          cutCoor.ex = size;
          cutCoor.ey = size;
          break;
        case 3:
          cutCoor.sx = size;
          cutCoor.sy = size - imgW;
          cutCoor.ex = size + imgH;
          cutCoor.ey = size + imgW;
          break;
      }

      ctx.translate(size, size);
      ctx.rotate((edg * Math.PI) / 180);
      ctx.drawImage(image, 0, 0);

      const imgData = ctx.getImageData(
        cutCoor.sx,
        cutCoor.sy,
        cutCoor.ex,
        cutCoor.ey
      );
      if (quadrant % 2 === 0) {
        canvas.width = imgW;
        canvas.height = imgH;
      } else {
        canvas.width = imgH;
        canvas.height = imgW;
      }
      ctx.putImageData(imgData, 0, 0);
      callback(canvas.toDataURL());
    };
  }

}
