import { Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ResultadosPesquisaComponent } from './pages/resultados-pesquisa/resultados-pesquisa.component';
import { MusicaDetalheComponent } from './pages/musica-detalhe/musica-detalhe.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "", component: CadastroComponent},
    {path: "cadastro", component: CadastroComponent},
    {path: "inicio", component: InicioComponent},
    {path: "perfil", component: PerfilComponent},
    {path: 'buscar/:termo', component: ResultadosPesquisaComponent},
    { path: 'musica/:id', component: MusicaDetalheComponent } // Rota para detalhes da música
];
