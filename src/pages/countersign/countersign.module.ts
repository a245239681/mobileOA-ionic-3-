import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { CountersignPage } from './countersign';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CountersignPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    IonicPageModule.forChild(CountersignPage),
  ],
})
export class CountersignPageModule {}
