import { Component } from '@angular/core';

/**
 * Generated class for the ReadercomponentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'readercomponent',
  templateUrl: 'readercomponent.html'
})
export class ReadercomponentComponent {

  text: string;

  constructor() {
    console.log('Hello ReadercomponentComponent Component');
    this.text = 'Hello World';
  }

}
