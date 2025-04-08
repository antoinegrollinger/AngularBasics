import { Component } from '@angular/core';
import { FirstComponent } from '../first/first.component';

@Component({
  selector: 'app-second',
  standalone: true,
  imports: [FirstComponent],
  template: `
    <p>
      Please input a value: <input (keyup) = "onKeyUp($event)"/>
      <app-first [value] = "inputValue"></app-first>
    </p>
  `,
  styles: ``
})
export class SecondComponent {

  inputValue: string = ""

  onKeyUp(event: any){
    this.inputValue = event.target.value
  }
}
