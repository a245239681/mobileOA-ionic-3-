import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { SendactiontreePage } from './sendactiontree';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SendactiontreePage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(SendactiontreePage),
  ],
})
export class SendactiontreePageModule {}
