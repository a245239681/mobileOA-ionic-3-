import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { SignaturepadPage } from './signaturepad';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@NgModule({
  declarations: [
    SignaturepadPage,
    SignaturePad
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(SignaturepadPage),
  ],
})
export class SignaturepadPageModule {}
