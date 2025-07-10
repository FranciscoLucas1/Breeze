import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // HttpHeaders não é mais necessário aqui
import { Usuario } from '../types/usuario';
import { Observable, tap } from 'rxjs'; // Importar o tap

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  // É uma boa prática ter a URL base da API aqui
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
    // O interceptor agora adiciona o token, então o código aqui fica mais limpo.
    return this.http.get<Usuario>(`${this.apiUrl}/auth/users/me/`);
  }

  atualizarUsuario(dados: Partial<Usuario> | FormData): Observable<Usuario> {
    // O interceptor também adiciona o token aqui.
    return this.http.patch<Usuario>(`${this.apiUrl}/auth/users/me/`, dados);
  }

  refreshToken(): Observable<{ access: string }> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    // IMPORTANTE: Verifique se a URL do seu backend para renovar o token é esta.
    // Em Django com Simple-JWT, geralmente é /api/token/refresh/
    return this.http.post<{ access: string }>(`${this.apiUrl}/auth/jwt/refresh/`, {
      refresh: refreshToken
    }).pipe(
      tap(tokens => {
        // Salva o novo access token que o backend retornou
        localStorage.setItem('access_token', tokens.access);
      })
    );
  }

  salvarTokens(tokens: { access: string, refresh: string }): void {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  }
}