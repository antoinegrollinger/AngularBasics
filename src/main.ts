import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { bootstrapApplication, platformBrowser } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing';
import { importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent,
  {
    providers: [
      importProvidersFrom(
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ),
    provideRouter(routes),
    provideHttpClient(),
  ],
});
