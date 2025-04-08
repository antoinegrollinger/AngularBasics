import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-first',
  standalone: true,
  template: `
    <p>Input value of the second component: {{ value }}</p>
    <p>Company name = {{ companyName }}</p>
    <p><button (click) = "onClick()">Change company name</button></p>
  `,
  styles: ``
})
export class FirstComponent {

    companyName: string = "Arhs"

    @Input() value: string = "";
    onClick(){
      this.companyName = "Click Binding works!"
    }
}
