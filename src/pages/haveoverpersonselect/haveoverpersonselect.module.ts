import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { HaveoverpersonselectPage } from './haveoverpersonselect';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    HaveoverpersonselectPage,
  ],
  imports: [
    IonicPageModule.forChild(HaveoverpersonselectPage),
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
  ],
})
export class HaveoverpersonselectPageModule {}
