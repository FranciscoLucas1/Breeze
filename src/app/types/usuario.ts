// src/app/models/usuario.ts
export interface UsuarioCadastro {
    email: string;
    username: string;
    password: string;
  }
  
export interface UsuarioLogin {
    username: string;
    password: string;
  }


export interface respostaLogin {
    access: string;
    refresh: string;
  }