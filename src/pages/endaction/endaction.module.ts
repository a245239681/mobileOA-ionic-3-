import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { EndactionPage } from './endaction';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EndactionPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(EndactionPage),
  ],
})
export class EndactionPageModule {}
