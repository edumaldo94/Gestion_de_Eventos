import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './auth/registro/registro.component';
import { EventoComponent } from './evento/evento.component';
import { ListaDeEventosComponent } from './evento/lista-de-eventos/lista-de-eventos.component';
import { DetalleEventoComponent } from './evento/detalle-evento/detalle-evento.component';
import { FormularioEventoComponent } from './evento/formulario-evento/formulario-evento.component'; // Ajusta la ruta según corresponda
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { ListaParticipantesComponent } from './lista-participantes/lista-participantes.component';
import { PerfilComponent } from './auth/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    NavComponent,
    DashboardComponent,
    RegistroComponent,
    EventoComponent,
    ListaDeEventosComponent,
    DetalleEventoComponent,
    FormularioEventoComponent,
    ListaParticipantesComponent,
    PerfilComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
