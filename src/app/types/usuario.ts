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


export interface Genero {
  id: number;
  nome: string;
}

export interface Usuario {
  id: number;
  username: string;
  email: string;
  bio: string;
  foto: string;
  critico: boolean;
  generos_favoritos: Genero[];
}




