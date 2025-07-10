import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeezerResponse } from '../types/deezer'; // Importa os tipos definidos

// Interface opcional para tipagem forte dos resultados

@Injectable({
  providedIn: 'root'
})
export class PesquisarMusicaService {
  
  private apiUrl = 'http://127.0.0.1:8000/api_bb/music/search/';

  // URL do backend para os charts
  private backendApiUrl = 'http://127.0.0.1:8000/api_bb';

  constructor(private http: HttpClient) { }

  search(term: string): Observable<DeezerResponse> {

    const params = new HttpParams().set('q', term);

    return this.http.get<DeezerResponse>(this.apiUrl, { params });
  }

  getMusicaDetalhe(id: number): Observable<any> {
  
    return this.http.get(`http://127.0.0.1:8000/api_bb/musica-detalhes/${id}/`);
  }

  createAvaliacao(avaliacaoData: { musica: number; nota: number; comentario: string }): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api_bb/avaliacoes/', avaliacaoData);
  }

   getTopBrasil(): Observable<DeezerResponse> {
    return this.http.get<DeezerResponse>(`${this.backendApiUrl}/charts/brasil/`);
  }

  getTopMundo(): Observable<DeezerResponse> {
    // O ID '0' representa o chart principal/global
    return this.http.get<DeezerResponse>(`${this.backendApiUrl}/charts/mundo/`);
  }
}