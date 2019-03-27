import { CountersignPageModule } from './../countersign/countersign.module';
import { SignaturepadPageModule } from './../signaturepad/signaturepad.module';
import { PersonselectPageModule } from './../personselect/personselect.module';
import { EndactionPageModule } from './../endaction/endaction.module';
import { SendactiontreePageModule } from './../sendactiontree/sendactiontree.module';
import { SecretinfoadvicePageModule } from './../secretinfoadvice/secretinfoadvice.module';
import { ReturnbackPageModule } from './../returnback/returnback.module';
import { SigsusscesPageModule } from './../sigsussces/sigsussces.module';
import { HaveoverpersonselectPageModule } from './../haveoverpersonselect/haveoverpersonselect.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmissionPage } from './submission';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SubmissionPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmissionPage),
    HaveoverpersonselectPageModule,
    ReturnbackPageModule,
    ComponentsModule,
    SigsusscesPageModule,
    SecretinfoadvicePageModule,
    SendactiontreePageModule,
    EndactionPageModule,
    PersonselectPageModule,
    SignaturepadPageModule,
    CountersignPageModule,
  ],
})
export class SubmissionPageModule {}
