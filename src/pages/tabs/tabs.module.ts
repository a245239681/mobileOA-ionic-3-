import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { MainIndexPageModule } from '../main-index/main-index.module';
import { MinePageModule } from '../mine/mine.module';
import { AddresslistPageModule } from '../addresslist/addresslist.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(TabsPage),
    MainIndexPageModule,
    MinePageModule,
    AddresslistPageModule
  ],
   declarations: [TabsPage],
})
export class TabsPageModule {}
