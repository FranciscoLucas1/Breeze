import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'
import { Router, RouterModule } from '@angular/router';

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


  constructor(private router: Router) {}  
  onSubmit() {
    this.router.navigate(['/inicio']);
  }


}


