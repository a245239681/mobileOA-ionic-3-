import { MinePage } from './../mine/mine';
import { AddresslistPage } from './../addresslist/addresslist';
import { MainIndexPage } from './../main-index/main-index';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

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
