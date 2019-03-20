import { MainindexService } from './../../service/maiindex/mainindex.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainIndexPage } from './main-index';

@NgModule({
  declarations: [
    MainIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(MainIndexPage),
  ],
  entryComponents:[MainIndexPage],
  providers:[MainindexService]
})
export class MainIndexPageModule {}
