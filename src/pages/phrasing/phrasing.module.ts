import { AddEditPhrasingPageModule } from './../add-edit-phrasing/add-edit-phrasing.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhrasingPage } from './phrasing';

@NgModule({
  declarations: [
    PhrasingPage,
  ],
  imports: [
    IonicPageModule.forChild(PhrasingPage),
    AddEditPhrasingPageModule
  ],
})
export class PhrasingPageModule {}
