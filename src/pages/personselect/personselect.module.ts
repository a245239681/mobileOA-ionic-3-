import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { PersonselectPage } from './personselect';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PersonselectPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    IonicPageModule.forChild(PersonselectPage),
  ],
})
export class PersonselectPageModule {}
