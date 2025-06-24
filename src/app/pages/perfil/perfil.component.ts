import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { Usuario } from '../../types/usuario';

@Component({
  selector: 'app-perfil',
  imports: [NavbarComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  usuario: Usuario | null = null;

  ngOnInit() {
    const usuarioSalvo = localStorage.getItem('usuario_logado');

    if (usuarioSalvo) {
      this.usuario = JSON.parse(usuarioSalvo);
  
    }

  }
}

