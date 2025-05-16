import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'
import { Router, RouterModule } from '@angular/router';

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
  constructor(private router: Router) {}
  onSubmit() {
    this.router.navigate(['/login']);
  }
}
