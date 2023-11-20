import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { LoginInterceptor } from './interceptor/login.interceptor';
import { provideOAuthClient } from 'angular-oauth2-oidc';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(
      withInterceptorsFromDi(),
      withFetch(),
  ),
  provideOAuthClient(),
  {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true,
  },
  ]
};
