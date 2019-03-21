import { MinePage } from './../mine/mine';
import { AddresslistPage } from './../addresslist/addresslist';
import { MainIndexPage } from './../main-index/main-index';
import { Component } from '@angular/core';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MainIndexPage;
  tab2Root = AddresslistPage;
  tab3Root = MinePage;

  constructor() {

  }
}
