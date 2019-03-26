import { NgModule } from '@angular/core';
import { AttachmentlistComponent } from './attachmentlist/attachmentlist';
import { IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CirculationinfoComponent } from './circulationinfo/circulationinfo';
import { DepartmentselectComponent } from './departmentselect/departmentselect';
import { DocumentpaperComponent } from './documentpaper/documentpaper';
import { HandleinfoComponent } from './handleinfo/handleinfo';
import { NextselectComponent } from './nextselect/nextselect';
import { ReadercomponentComponent } from './readercomponent/readercomponent';
import { SignComponent } from './sign/sign';
import { VerificationComponent } from './verification/verification';

@NgModule({
	declarations: [AttachmentlistComponent,
    CirculationinfoComponent,
    DepartmentselectComponent,
    DocumentpaperComponent,
    HandleinfoComponent,
    NextselectComponent,
    ReadercomponentComponent,
    SignComponent,
    VerificationComponent],
	imports: [IonicModule, FormsModule, CommonModule],
	exports: [AttachmentlistComponent,
    CirculationinfoComponent,
    DepartmentselectComponent,
    DocumentpaperComponent,
    HandleinfoComponent,
    NextselectComponent,
    ReadercomponentComponent,
    SignComponent,
    VerificationComponent]
})
export class ComponentsModule {}
