import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  logado(): boolean {
    return !!localStorage.getItem('access_token'); // !! transforma em true se tiver token e false e não tiver
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

}
