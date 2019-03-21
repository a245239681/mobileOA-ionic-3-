import { PhrasingPageModule } from './../phrasing/phrasing.module';
import { QrCorePageModule } from './../qr-core/qr-core.module';
import { LoginPageModule } from './../login/login.module';
import { UserInfo } from './../../infrastructure/user-info';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinePage } from './mine';
import { ChangepasswordPageModule } from '../changepassword/changepassword.module';
import { PersonalInformationPageModule } from '../personal-information/personal-information.module';
import { AppVersion } from '@ionic-native/app-version';

@NgModule({
  declarations: [
    MinePage,
  ],
  imports: [
    IonicPageModule.forChild(MinePage),
    LoginPageModule,
    ChangepasswordPageModule,
    PersonalInformationPageModule,
    QrCorePageModule,
    PhrasingPageModule
  ],
  providers:[UserInfo, AppVersion]
})
export class MinePageModule {}
