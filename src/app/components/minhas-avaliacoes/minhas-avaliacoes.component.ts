import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-minhas-avaliacoes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './minhas-avaliacoes.component.html',
  styleUrls: ['./minhas-avaliacoes.component.css']
})
export class MinhasAvaliacoesComponent {
  // @Input() permite que este componente receba a lista de avaliações
  // do componente pai (PerfilComponent).
  @Input() avaliacoes: any[] = [];
}