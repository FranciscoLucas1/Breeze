import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { respostaLogin, UsuarioLogin } from '../../types/usuario';


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


  constructor(private router: Router, private client: HttpClient) { }
  onSubmit() {

    const formulario = this.loginForm.value
    
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
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar usuário:', err);
      }
    })

  }


}


