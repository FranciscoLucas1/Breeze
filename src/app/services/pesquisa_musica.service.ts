import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeezerResponse } from '../types/deezer'; // Importa os tipos definidos

// Interface opcional para tipagem forte dos resultados

@Injectable({
  providedIn: 'root'
})
export class PesquisarMusicaService {
  // URL do SEU backend, não do Deezer
  private apiUrl = 'http://127.0.0.1:8000/api_bb/music/search/';

  constructor(private http: HttpClient) { }

  search(term: string): Observable<DeezerResponse> {
    // Monta os parâmetros da requisição para o seu backend
    const params = new HttpParams().set('q', term);
    
    // Faz a chamada para o seu backend Django
    return this.http.get<DeezerResponse>(this.apiUrl, { params });
  }
}