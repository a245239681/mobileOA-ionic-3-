import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { DocumentrelatedPage } from './documentrelated';
import { ComponentsModule } from '../../components/components.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DocumentrelatedPage,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(DocumentrelatedPage),
  ],
})
export class DocumentrelatedPageModule {}
