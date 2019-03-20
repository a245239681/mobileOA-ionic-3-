import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditPhrasingPage } from './add-edit-phrasing';

@NgModule({
  declarations: [
    AddEditPhrasingPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditPhrasingPage),
  ],
  entryComponents:[AddEditPhrasingPage]
})
export class AddEditPhrasingPageModule {}
