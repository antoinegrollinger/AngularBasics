import { Subscription } from 'rxjs';
import { NewsService } from './../news.service';
import { Component, computed, OnInit, signal, WritableSignal } from '@angular/core';
import { News } from './NewsInterface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-news-list',
  imports: [RouterLink, ReactiveFormsModule],
  standalone: true,
  template: `
  <form [formGroup]="filterForm">
    <label for="filter">Filter:</label>
    <input id="filter" formControlName="filter" />
  </form>
  <button (click)="newsCreation()">Create new news</button>
  <p>
    @for(n of newsList(); track n.id){
      <a [routerLink]="['/news', n.id]"> <h1>{{n?.title}}</h1></a>
      <h2>Author: {{n.author.name}}</h2>
      <h3>Category: {{n.category.name}}</h3>
      <p>{{n.description}}</p>
    } @empty {
      <p>No news found</p>
    }
  </p>
  `,
  styles: ``
})
export class NewsListComponent implements OnInit{

  private s?: Subscription
  private sff?: Subscription
  readonly newsList: WritableSignal<News[]> = signal<News[]>([])

  filterForm:FormGroup = new FormGroup({
    filter: new FormControl("", {nonNullable:true})
  })

  constructor(private newsService: NewsService, private router: Router) { }


  ngOnInit(): void {
    this.s = this.newsService.fetchAllNews().subscribe((newsList) => {
      this.newsList.set(newsList);
    })

    this.sff = this.filterForm.get("filter")?.valueChanges.subscribe(selectedValue => {
      this.s?.unsubscribe()
      this.s = this.newsService.fetchNews(selectedValue).subscribe((newsList) => {
        this.newsList.set(newsList)
      })
    })
  }

  ngOnDestroy(): void{
    this.s?.unsubscribe()
    this.sff?.unsubscribe()
  }

  newsCreation(){
    this.router.navigate(['/news/create'])
  }

}
