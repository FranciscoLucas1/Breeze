import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
// REMOVA withFetch, ele não é necessário aqui
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Deixe a configuração do HttpClient assim. Simples e funcional.
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  ]
};