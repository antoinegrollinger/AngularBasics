import { Component, signal, WritableSignal, computed } from '@angular/core';

@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [],
  template: `
  @if(show()){
      @for(language of languages(); track $index){
        <button (click)="translate(language)">{{language}}</button>
      }
      <p>{{value()}}</p>
  }
  `,
  styles: ``
})
export class TranslateComponent {
  readonly text: WritableSignal<string> = signal('Hello')
  languages = signal(['en', 'fr', 'it'])
  show = signal(false)
  selectedLanguage = signal("en")
  value = signal("Hello")

 translate(language: string){
  this.selectedLanguage.set(language)
  if(language === 'en'){
    this.value.set("Hello")
  }
  else if (language === 'fr'){
    this.value.set("Bonjour")
  }
  else{
    this.value.set("Bongiorno")
  }
}

}
