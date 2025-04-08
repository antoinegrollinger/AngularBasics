import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { CategoryComponent } from './category/category.component';
import { NewsComponent } from './news/news.component';
import { NewsCreationComponent } from './news-creation/news-creation.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { isEvenGuard } from './guards/evenguard';
import { denyGuests } from './guards/denyguests';

export const routes: Routes = [
  { path: 'news',
    canActivate: [denyGuests],
    loadComponent: () => import('./news-list/news-list.component').then(m => m.NewsListComponent)
  },
  { path: 'category',
    canActivate: [denyGuests],
    loadComponent: () => import('./category/category.component').then(m => m.CategoryComponent)
  },
  { path: 'news/create',
    canActivate: [denyGuests],
    loadComponent: () => import('./news-creation/news-creation.component').then(m => m.NewsCreationComponent)
  },
  { path: 'news/:id',
    canActivate: [denyGuests, isEvenGuard],
    loadComponent: () => import('./news/news.component').then(m => m.NewsComponent)
    },
  {
    path: 'unauthorized',
    loadComponent: () => import('./unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },
  { path: 'news/edit/:id',
    canActivate: [denyGuests],
    loadComponent: () => import('./news-creation/news-creation.component').then(m => m.NewsCreationComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent)
  },
  { path: '', redirectTo: '/news', pathMatch: 'full' },

];
