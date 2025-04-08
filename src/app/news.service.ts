import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from './news-list/NewsInterface';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  constructor(private http: HttpClient) { }

  fetchAllNews(){
    return this.http.get<News[]>('http://localhost:3000/News')
  }

  fetchNews(query:string){
    return this.http.get<News[]>('http://localhost:3000/News',
      {params: {"q": query}}
    )
  }

  fetchNewsById(id: any){
    return this.http.get<News>('http://localhost:3000/News/'+id
    )
  }

  createNews(news: News){
    return this.http.post<News>('http://localhost:3000/News', news)
  }

  updateNews(news: News){
    return this.http.put<News>('http://localhost:3000/News/'+news.id, news)
  }

}
