import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PesquisarMusicaService } from '../../services/pesquisa_musica.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-musica-detalhe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './musica-detalhe.component.html',
  styleUrls: ['./musica-detalhe.component.css']
})
export class MusicaDetalheComponent implements OnInit {
  musica: any = null;
  isLoading = true;
  avaliacaoForm: FormGroup;

  // Propriedades para o controle das estrelas
  notaAtual = 0;
  hoverNota = 0;

  constructor(
    private route: ActivatedRoute,
    private musicService: PesquisarMusicaService,
    private fb: FormBuilder,
    public authService: AutenticacaoService
  ) {
    this.avaliacaoForm = this.fb.group({
      // A nota (estrelas) continua sendo obrigatória
      nota: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      // ✅ CORREÇÃO: Removido o Validators.required do comentário
      comentario: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.musicService.getMusicaDetalhe(+id).subscribe(data => {
        this.musica = data;
        this.isLoading = false;
      });
    }
  }

  // --- Lógica para interatividade das estrelas ---

  avaliar(nota: number): void {
    this.notaAtual = nota;
    this.avaliacaoForm.get('nota')?.setValue(nota);
  }

  destacarEstrelas(nota: number): void {
    this.hoverNota = nota;
  }

  resetarEstrelas(): void {
    this.hoverNota = 0;
  }

  enviarAvaliaco(): void {
    // A validação do formulário agora só verifica se a 'nota' foi preenchida
    if (this.avaliacaoForm.invalid || !this.musica) {
      return;
    }
    const avaliacaoData = {
      musica: this.musica.id,
      ...this.avaliacaoForm.value
    };

    this.musicService.createAvaliacao(avaliacaoData).subscribe(novaAvaliacao => {
      this.musica.avaliacoes.unshift(novaAvaliacao);
      this.avaliacaoForm.reset();
      this.notaAtual = 0;
    });
  }
}
