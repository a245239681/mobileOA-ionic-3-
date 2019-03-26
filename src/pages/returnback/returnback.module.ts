import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { ReturnbackPage } from './returnback';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReturnbackPage,
  ],
  imports: [
    IonicPageModule.forChild(ReturnbackPage),
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class ReturnbackPageModule {}
