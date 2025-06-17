import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'
import {Router, RouterModule } from '@angular/router';
import {UsuarioCadastro } from '../../types/usuario'

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {  
  cadastroForm = new FormGroup({
    email: new FormControl(''),
    usuario: new FormControl(''),
    senha: new FormControl(''),
    senha_repetir: new FormControl(''),
  });
  constructor(private router: Router, private client: HttpClient) {}
  onSubmit() {

    const formulario = this.cadastroForm.value;
    const DadosUsuario: UsuarioCadastro = {
      email: formulario.email!,
      username: formulario.usuario!,
      password: formulario.senha!,
    };

    this.client.post('http://localhost:8000/auth/users/', DadosUsuario)
    .subscribe({
      next: (res) => {
        console.log('Usuário cadastrado com sucesso:', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar usuário:', err);
      }
    })

  }
}
