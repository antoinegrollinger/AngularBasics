import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { News } from '../news-list/NewsInterface';

@Component({
  selector: 'app-news-creation',
  imports: [ReactiveFormsModule],
  standalone: true,
  template: `
    <div>
      <form [formGroup]="newsForm" (ngSubmit)="onSubmit()">
        @if(!edit){
          <label for = "id">Id:</label>
          <input id="id" formControlName="id"/>
        }
        <label for="title">Title:</label>
        <input id="title" formControlName="title"/>
        <label for="description">Description:</label>
        <input id="description" formControlName="description"/>
        <label for="authorId">Author Id:</label>
        <input id="authorId" formControlName="authorId"/>
        <label for="authorName">Author Name:</label>
        <input id="authorName" formControlName="authorName"/>
        <label for="categoryId">Category Id:</label>
        <input id="categoryId" formControlName="categoryId"/>
        <label for="categoryName">Category Name:</label>
        <input id="categoryName" formControlName="categoryName"/>
        @if(edit){
          <button type="submit" [disabled]="!newsForm.valid">Update</button>
          <button (click)="goBackToNew()">Cancel</button>
        } @else {
          <button type="submit" [disabled]="!newsForm.valid">Create</button>
          <button (click)="goBackToNews()">Cancel</button>
        }
      </form>
    </div>
  `,
  styles: `label, input {
    display: block;
    margin: 0.5rem 0;
  }`
})
export class NewsCreationComponent implements OnInit {
  constructor(private service: NewsService, private route: ActivatedRoute, private router: Router) { }

  private s?: Subscription
  private snews?: Subscription
  newsForm: FormGroup = new FormGroup({
    id: new FormControl("", { nonNullable: true}),
    title: new FormControl("", { nonNullable: true }),
    description: new FormControl("", { nonNullable: true }),
    authorName: new FormControl("", { nonNullable: true }),
    authorId: new FormControl("", { nonNullable: true }),
    categoryName: new FormControl("", { nonNullable: true }),
    categoryId: new FormControl("", { nonNullable: true })
  });
  news: News | undefined;
  edit: boolean = false;

  ngOnInit(): void {

    this.s = this.route.paramMap.subscribe(params => {
      this.edit = params.has('id');
      if(this.edit){
        const id = params.get('id');
        this.snews = this.service.fetchNewsById(id).subscribe(data => {
          this.news = data;
          this.newsForm.patchValue({
            id: this.news.id,
            title: this.news.title,
            description: this.news.description,
            authorId: this.news.author.id,
            authorName: this.news.author.name,
            categoryId: this.news.category.id,
            categoryName: this.news.category.name
          });
        })
      }

    })
  }

  ngOnDestroy(): void {
    this.s?.unsubscribe()
    this.snews?.unsubscribe()
  }

  onSubmit(){
    const newsData: News = {
      id: this.newsForm.value.id,
      title: this.newsForm.value.title,
      description: this.newsForm.value.description,
      author: {id: this.newsForm.value.authorId, name: this.newsForm.value.authorName},
      category: {id: this.newsForm.value.categoryId, name: this.newsForm.value.categoryName}
    }
    if(this.edit){
      this.service.updateNews(newsData).subscribe(data => {
        console.log("News updated", data);
        this.goBackToNews()
      })
    }else{
      this.service.createNews(newsData).subscribe(data => {
        console.log("News created", data);
        this.goBackToNews()
      })
    }
  }

  goBackToNews(){
    this.router.navigate(['/news'])
  }

  goBackToNew(){
    this.router.navigate(['/news', this.news?.id])
  }


}
