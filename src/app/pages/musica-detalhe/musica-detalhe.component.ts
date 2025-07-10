import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PesquisarMusicaService } from '../../services/pesquisa_musica.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NotificacaoService } from '../../services/notificacao.service';
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

  // controle das estrelas
  notaAtual = 0;
  hoverNota = 0;

  constructor(
    private route: ActivatedRoute,
    private musicService: PesquisarMusicaService,
    private fb: FormBuilder,
    private noti: NotificacaoService,
    public authService: AutenticacaoService
    
  ) {
    this.avaliacaoForm = this.fb.group({
      nota: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
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

  enviarAvaliacao(): void {
    if (this.avaliacaoForm.invalid || !this.musica) {
      return;
    }
    const avaliacaoData = {
      musica_id: this.musica.id,
      ...this.avaliacaoForm.value
    };

    this.musicService.createAvaliacao(avaliacaoData).subscribe({
      next: (novaAvaliacao) => {

        this.musica.avaliacoes.unshift(novaAvaliacao);
        this.avaliacaoForm.reset();
        this.notaAtual = 0;

        this.musica.avaliado_pelo_usuario = true; 
        this.noti.sucesso("Música avaliada", "Avaliação inserida")

      },
      error: (err) => {
   
        if (err.status === 400 && err.error.non_field_errors) {
          alert(err.error.non_field_errors[0]); 
        } else {
          console.error('Erro ao enviar avaliação:', err);
          alert('Ocorreu um erro inesperado ao enviar sua avaliação.');
        }
      }
    });
  }
}
