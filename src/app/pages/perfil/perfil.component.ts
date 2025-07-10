

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'; 
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { Usuario } from '../../types/usuario';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FormsModule
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: Usuario | null = null;
  usuarioEditavel: Partial<Usuario> | null = null;
  editando = false;

  // NOVAS VARIÁVEIS PARA O UPLOAD
  fotoPreview: string | ArrayBuffer | null = null;
  arquivoSelecionado: File | null = null;

  // Referência ao input de arquivo no HTML
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private autenticacaoService: AutenticacaoService) {}

  ngOnInit() {
    this.carregarUsuario();
  }

  carregarUsuario() {
    this.autenticacaoService.obterUsuarioLogado().subscribe(usuario => {
      this.usuario = usuario;
      localStorage.setItem('usuario_logado', JSON.stringify(usuario));
    });
  }

  iniciarEdicao(): void {
    this.usuarioEditavel = { ...this.usuario };
    this.editando = true;
    // Limpa o preview anterior ao iniciar uma nova edição
    this.fotoPreview = null;
    this.arquivoSelecionado = null;
  }

  cancelarEdicao(): void {
    this.usuarioEditavel = null;
    this.editando = false;
    this.fotoPreview = null;
    this.arquivoSelecionado = null;
  }

  // NOVA FUNÇÃO: Disparada quando o usuário seleciona um arquivo.
  aoSelecionarFoto(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.arquivoSelecionado = file;

      
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  
  salvarAlteracoes(): void {
    if (!this.usuarioEditavel) return;

   
    if (!this.arquivoSelecionado) {
      const { foto, ...dadosParaSalvar } = this.usuarioEditavel;
      this.autenticacaoService.atualizarUsuario(dadosParaSalvar).subscribe(this.handleUpdateResponse);
      return;
    }

 
    const formData = new FormData();
    formData.append('username', this.usuarioEditavel.username!);
    formData.append('bio', this.usuarioEditavel.bio!);
    formData.append('foto', this.arquivoSelecionado, this.arquivoSelecionado.name);

    this.autenticacaoService.atualizarUsuario(formData).subscribe(this.handleUpdateResponse);
  }

  // evitar repetir codigo
  private handleUpdateResponse = {
    next: (usuarioAtualizado: Usuario) => {
      this.usuario = usuarioAtualizado;
      localStorage.setItem('usuario_logado', JSON.stringify(usuarioAtualizado));
      this.editando = false;
      this.usuarioEditavel = null;
      this.fotoPreview = null;
      this.arquivoSelecionado = null;
    },
    error: (err: any) => {
      console.error('Erro ao atualizar o perfil', err);
    }
  };
}