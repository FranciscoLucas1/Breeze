import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  busca = '';

  constructor(public autenticaoServico: AutenticacaoService, private router: Router) { }
  
  buscar() {
    console.log('Buscando por:', this.busca);
  }

  logout() {
    this.autenticaoServico.logout();
    this.router.navigate(['/login']);
  }
}
