//app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListaDeEventosComponent } from './evento/lista-de-eventos/lista-de-eventos.component';
import { DetalleEventoComponent } from './evento/detalle-evento/detalle-evento.component';
import { EventoComponent } from './evento/evento.component';
import { FormularioEventoComponent } from './evento/formulario-evento/formulario-evento.component';
import { AuthGuard } from './evento/formulario-evento/auth.guard';
import { AsistenteGuard } from './evento/formulario-evento/auth.guard.asistente';
import { PerfilComponent } from './auth/perfil/perfil.component';
import { RoleGuard } from './evento/formulario-evento/RoleGuard';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'inicio', component: DashboardComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'evento',
    component: EventoComponent,
    children: [
      { path: 'eventos-asistente', component: ListaDeEventosComponent, data: { role: 'asistente' }, canActivate: [AsistenteGuard]},
      { path: 'eventos-organizador', component: ListaDeEventosComponent, data: { role: 'Organizador' }, canActivate: [AuthGuard]},
      { path: 'formulario-evento', component: FormularioEventoComponent, canActivate: [AuthGuard] },
      { path: 'perfil', component: PerfilComponent,canActivate: [RoleGuard] }
    ]
  },
  { path: 'evento/:idEvento', component: DetalleEventoComponent,canActivate: [RoleGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
/*
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'inicio', component: DashboardComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'eventos-asistente', component: ListaDeEventosComponent, data: { role: 'asistente' }},
  { path: 'eventos-organizador', component: ListaDeEventosComponent, data: { role: 'Organizador' }},
  { path: 'evento/:idEvento', component: DetalleEventoComponent }
];*/