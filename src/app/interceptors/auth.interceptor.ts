import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AutenticacaoService } from '../services/autenticacao.service';
import { Router } from '@angular/router';

// Variáveis de estado para controlar o processo de refresh
let isRefreshing = false;
// BehaviorSubject para "prender" as requisições enquanto o token é renovado
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  
  const authService = inject(AutenticacaoService);
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  // CORREÇÃO: Ajustado para as rotas de JWT corretas.
  // Se for uma requisição para obter/renovar o token, não adiciona o header de autorização.
  if (req.url.includes('/auth/jwt/')) {
    return next(req);
  }

  // Adiciona o token de acesso à requisição, se ele existir
  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  // Envia a requisição e prepara para tratar erros
  return next(req).pipe(
    catchError((error: unknown) => {
      // CORREÇÃO: Adicionamos uma verificação para não tentar renovar o token em caso de falha no próprio login.
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !req.url.includes('/auth/jwt/create/') // Não intercepta falha de login
      ) {
        return handle401Error(req, next, authService, router);
      }
      
      // Para outros erros (incluindo o 401 do login), apenas os relança para o componente que fez a chamada.
      return throwError(() => error);
    })
  );
};

// Função auxiliar para encapsular a lógica de refresh (sem alterações aqui)
function handle401Error(req: HttpRequest<any>, next: HttpHandlerFn, authService: AutenticacaoService, router: Router): Observable<HttpEvent<any>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((tokenResponse: any) => {
        isRefreshing = false;
        refreshTokenSubject.next(tokenResponse.access);
        
        // Repete a requisição que falhou, mas agora com o novo token
        return next(req.clone({
          headers: req.headers.set('Authorization', `Bearer ${tokenResponse.access}`)
        }));
      }),
      catchError((err) => {
        isRefreshing = false;
        // Se a renovação falhar, desloga o usuário e o redireciona
        authService.logout();
        router.navigate(['/login']);
        return throwError(() => err);
      })
    );
  } else {
    // Se outro request chegar enquanto o token está sendo renovado, ele espera
    return refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(jwt => {
        return next(req.clone({
          headers: req.headers.set('Authorization', `Bearer ${jwt}`)
        }));
      })
    );
  }
}