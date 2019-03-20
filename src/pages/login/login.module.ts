import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { UserInfo } from '../../infrastructure/user-info';
import { LoginService } from '../../service/login/login.service';
import { MainindexService } from '../../service/maiindex/mainindex.service';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  providers:[UserInfo, LoginService, MainindexService]
})
export class LoginPageModule {}
