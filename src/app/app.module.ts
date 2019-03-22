import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { LoginPageModule } from './../pages/login/login.module';
import { UserInfo } from './../infrastructure/user-info';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonHelper } from '../infrastructure/commonHelper';
import { API_URL } from '../infrastructure/host-address';
import { environment } from '../environments/environment';
import { CachingInterceptor, AuthInterceptor } from '../infrastructure/http-interceptor';
import { RequestCache, RequestCacheWithMap } from '../infrastructure/request-cache';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    TabsPageModule,
    LoginPageModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,    //导航页覆盖底下tab
      backButtonText:'返回',
      backButtonIcon:'ios-arrow-back'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    CommonHelper,
    StatusBar,
    SplashScreen,
    UserInfo,
    CommonHelper,
    InAppBrowser,
    FileOpener,
    File,
    FileTransfer,
    {
      provide: API_URL,
      useValue: environment.url,
    },
    [
      { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ],
    { provide: RequestCache, useClass: RequestCacheWithMap },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
