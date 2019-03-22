import { Component, Input } from '@angular/core';

/**
 * Generated class for the VerificationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'verification',
  templateUrl: 'verification.html'
})
export class VerificationComponent {

  @Input() text: string;

  constructor() {
  }

}
