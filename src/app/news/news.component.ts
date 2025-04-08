import { News } from './../news-list/NewsInterface';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { NewsService } from '../news.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news',
  imports: [RouterLink],
  standalone: true,
  template: `
    <button (click)="editNews()">Edit</button>
    <div>
      <h1>{{news?.title}}</h1>
      <h2>Author: {{news?.author?.name}}</h2>
      <h3>Category: {{news?.category?.name}}</h3>
      <p>{{news?.description}}</p>
    </div>
    <a [routerLink]="'/news'">Back to news list</a>
  `,
  styles: ``
})
export class NewsComponent implements OnInit {
  constructor(private service: NewsService, private route: ActivatedRoute, private router: Router) { }

  private s?: Subscription
  private snews?: Subscription
  news?: News;

  ngOnInit(){
    this.s = this.route.params.subscribe(params => {
      const id = params['id'];
      this.snews = this.service.fetchNewsById(id).subscribe(data => {
        this.news = data;
      })
    })
  }
  ngOnDestroy(): void {
    this.s?.unsubscribe()
    this.snews?.unsubscribe()
  }

  editNews() {
    this.router.navigate(['/news/edit', this.news?.id]);
  }
}
