import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
      'test'
  `,
 
})


export class MyCardComponent  {

  @Input() childMessage: string | undefined;

  constructor() {
    
   }
 
}
