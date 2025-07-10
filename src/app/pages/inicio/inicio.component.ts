import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { PesquisarMusicaService } from '../../services/pesquisa_musica.service';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  // Propriedades para armazenar as listas COMPLETAS
  topBrasilCompleto: any[] = [];
  topMundoCompleto: any[] = [];

  // Propriedades para armazenar apenas as 5 músicas a serem exibidas
  topBrasilDisplay: any[] = [];
  topMundoDisplay: any[] = [];

  // Controle de paginação
  indiceBrasil = 0;
  indiceMundo = 0;
  itensPorPagina = 5;

  isLoading = true;

  constructor(private musicService: PesquisarMusicaService) {}

  ngOnInit(): void {
    this.carregarCharts();
  }

  carregarCharts(): void {
    this.isLoading = true;

    this.musicService.getTopBrasil().subscribe({
      next: (response) => {
    
        this.topBrasilCompleto = response.data;
        this.atualizarDisplay('brasil');
      },
      error: (err) => console.error('Erro ao buscar Top Brasil:', err)
    });

    this.musicService.getTopMundo().subscribe({
      next: (response) => {
        this.topMundoCompleto = response.data;
        this.atualizarDisplay('mundo');
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar Top Mundo:', err);
        this.isLoading = false;
      }
    });
  }


  atualizarDisplay(tipo: 'brasil' | 'mundo'): void {
    if (tipo === 'brasil') {
      const fim = this.indiceBrasil + this.itensPorPagina;
      this.topBrasilDisplay = this.topBrasilCompleto.slice(this.indiceBrasil, fim);
    } else {
      const fim = this.indiceMundo + this.itensPorPagina;
      this.topMundoDisplay = this.topMundoCompleto.slice(this.indiceMundo, fim);
    }
  }

  navegar(tipo: 'brasil' | 'mundo', direcao: 'proximo' | 'anterior'): void {
    if (tipo === 'brasil') {
      if (direcao === 'proximo' && (this.indiceBrasil + this.itensPorPagina) < this.topBrasilCompleto.length) {
        this.indiceBrasil += this.itensPorPagina;
      } else if (direcao === 'anterior' && this.indiceBrasil > 0) {
        this.indiceBrasil -= this.itensPorPagina;
      }
      this.atualizarDisplay('brasil');
    } else { 
      if (direcao === 'proximo' && (this.indiceMundo + this.itensPorPagina) < this.topMundoCompleto.length) {
        this.indiceMundo += this.itensPorPagina;
      } else if (direcao === 'anterior' && this.indiceMundo > 0) {
        this.indiceMundo -= this.itensPorPagina;
      }
      this.atualizarDisplay('mundo');
    }
  }
}