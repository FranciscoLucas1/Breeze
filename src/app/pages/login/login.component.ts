import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { respostaLogin, UsuarioLogin, Usuario } from '../../types/usuario';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { NotificacaoService } from '../../services/notificacao.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    usuario: new FormControl(''),
    senha: new FormControl(''),
  });

  constructor(
    private router: Router,
    private client: HttpClient,
    private autenticaoServico: AutenticacaoService,
    private noti: NotificacaoService
  ) {}

  onSubmit() {
    const formulario = this.loginForm.value;
    const DadosUsuario: UsuarioLogin = {
      username: formulario.usuario!,
      password: formulario.senha!,
    };

    this.client.post<respostaLogin>('http://localhost:8000/auth/jwt/create/', DadosUsuario)
      .subscribe({
        next: (res) => {
          console.log('Login efetuado com sucesso:', res);
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);


          this.autenticaoServico.obterUsuarioLogado().subscribe({
            next: (usuario: Usuario) => {
              localStorage.setItem('usuario_logado', JSON.stringify(usuario));
              console.log('Usuário logado:', usuario);
              this.router.navigate(['/inicio']);
              this.noti.sucesso('Login efetuado com sucesso!', 'Bem-vindo(a)');
            },
            error: (erro) => {
              console.error('Erro ao obter dados do usuário:', erro);
            }
          });
        },
        error: (err) => {
          console.error('Erro ao logar:', err);
          this.noti.trataErro(err);
        }
      });
  }
}
