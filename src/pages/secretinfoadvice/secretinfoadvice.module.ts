import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { SecretinfoadvicePage } from './secretinfoadvice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SecretinfoadvicePage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(SecretinfoadvicePage),
  ],
})
export class SecretinfoadvicePageModule {}
