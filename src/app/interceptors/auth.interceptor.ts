import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

// Transformamos a classe em uma constante exportada (uma função)
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  
  // 1. A lógica que estava dentro do método intercept() vem para cá
  const token = localStorage.getItem('access_token');

  // 2. Se não houver token, apenas continua a requisição original
  if (!token) {
    return next(req);
  }

  // 3. Se houver token, clona a requisição e adiciona o cabeçalho
  const clonedRequest = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  // 4. Envia a requisição clonada com o token
  return next(clonedRequest);
};
