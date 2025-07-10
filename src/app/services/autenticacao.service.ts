// src/app/services/autenticacao.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../types/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private apiUrl = 'http://localhost:8000/auth/users/me/';

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
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    
    return this.http.get<Usuario>(this.apiUrl, { headers });
  }

 
  atualizarUsuario(dados: Partial<Usuario> | FormData): Observable<Usuario> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.patch<Usuario>('http://localhost:8000/auth/users/me/', dados, { headers });
  }
}