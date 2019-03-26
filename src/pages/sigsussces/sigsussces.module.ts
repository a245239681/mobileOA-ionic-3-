import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { SigsusscesPage } from './sigsussces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SigsusscesPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(SigsusscesPage),
  ],
})
export class SigsusscesPageModule {}
