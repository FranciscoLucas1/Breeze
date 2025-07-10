import { Component, OnInit } from '@angular/core';
import { DeezerTrack } from '../../types/deezer';
import { PesquisarMusicaService as PesquisarMusicaService } from '../../services/pesquisa_musica.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-resultados-pesquisa',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './resultados-pesquisa.component.html',
  styleUrl: './resultados-pesquisa.component.css',
})

export class ResultadosPesquisaComponent implements OnInit {

  tracks: DeezerTrack[] = [];
  isLoading = true; // Inicia como true para mostrar o loader
  errorMessage: string | null = null;
  searchTerm = '';

  constructor(
    private route: ActivatedRoute,
    private musicSearchService: PesquisarMusicaService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    // Escuta mudanças no parâmetro 'termo' da URL
    this.route.paramMap.subscribe(params => {
      const termo = params.get('termo');
      if (termo) {
        this.searchTerm = termo;
        this.loadResults(termo);
      }
    });
  }

  loadResults(termo: string): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.tracks = []; // Limpa resultados anteriores

    interface SearchResponse {
      data: DeezerTrack[];
      [key: string]: any;
    }

    this.musicSearchService.search(termo).subscribe({
      next: (response: SearchResponse) => {
      this.tracks = response.data;
      this.isLoading = false;
      },
      error: (err: unknown) => {
      this.errorMessage = 'Ops! Houve um erro ao buscar os resultados. Tente novamente mais tarde.';
      console.error(err);
      this.isLoading = false;
      }
    });
  }

  // Futuramente, você pode usar este método para navegar para uma página de avaliação
  selecionarMusica(track: DeezerTrack): void {
    // Navega para a página de detalhes usando o ID do Deezer
    this.router.navigate(['/musica', track.id]); 
  }
}