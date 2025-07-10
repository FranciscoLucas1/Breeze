import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Usuario } from '../types/usuario';
import { Observable, tap } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  logado(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('usuario_logado');
  }

  obterUsuarioLogado(): Observable<Usuario> {

    return this.http.get<Usuario>(`${this.apiUrl}/auth/users/me/`);
  }

  atualizarUsuario(dados: Partial<Usuario> | FormData): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/auth/users/me/`, dados);
  }

  refreshToken(): Observable<{ access: string }> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    
    return this.http.post<{ access: string }>(`${this.apiUrl}/auth/jwt/refresh/`, {
      refresh: refreshToken
    }).pipe(
      tap(tokens => {
        localStorage.setItem('access_token', tokens.access);
      })
    );
  }

  getMinhasAvaliacoes(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api_bb/avaliacoes/');
  }

  salvarTokens(tokens: { access: string, refresh: string }): void {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  }
}