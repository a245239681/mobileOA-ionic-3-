import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { DocumentdetailPage } from './documentdetail';
import { ComponentsModule } from '../../components/components.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DocumentdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DocumentdetailPage),
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class DocumentdetailPageModule {}
