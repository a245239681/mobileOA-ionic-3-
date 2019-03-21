import { MainindexService } from './../../service/maiindex/mainindex.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainIndexPage } from './main-index';
import { DocumentlistPageModule } from '../documentlist/documentlist.module';

@NgModule({
  declarations: [
    MainIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(MainIndexPage),
    DocumentlistPageModule
  ],
  entryComponents:[MainIndexPage],
  providers:[MainindexService]
})
export class MainIndexPageModule {}
