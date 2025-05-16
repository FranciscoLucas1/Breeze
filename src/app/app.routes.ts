import { Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "", component: CadastroComponent},
    {path: "cadastro", component: CadastroComponent},
    {path: "inicio", component: InicioComponent},
    {path: "perfil", component: PerfilComponent},

];
