import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  termoBusca = '';

  constructor(
    public autenticaoServico: AutenticacaoService,
    private router: Router
  ) { }
  buscar(): void {
    if (this.termoBusca.trim()) {
      // Navega para uma rota de resultados de busca
      // Ex: /buscar/daft%punk
      this.router.navigate(['/buscar', this.termoBusca]);
    }
  }

  logout() {
    this.autenticaoServico.logout();
    this.router.navigate(['/login']);
  }
}
