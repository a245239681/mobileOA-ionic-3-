import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrCorePage } from './qr-core';

@NgModule({
  declarations: [
    QrCorePage,
  ],
  imports: [
    IonicPageModule.forChild(QrCorePage),
  ],
})
export class QrCorePageModule {}
