import { Component } from '@angular/core';

/**
 * Generated class for the NextselectComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'nextselect',
  templateUrl: 'nextselect.html'
})
export class NextselectComponent {

  text: string;

  constructor() {
    console.log('Hello NextselectComponent Component');
    this.text = 'Hello World';
  }

}
