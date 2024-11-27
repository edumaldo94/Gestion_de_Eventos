//lista-participantes.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ParticipantesService } from '../service/participantes.service';
import { AuthService } from '../../app/auth/services/auth/auth.service'; 
import { EventoService } from '../service/evento.service';
declare const bootstrap: any;
@Component({
  selector: 'app-lista-participantes',
  templateUrl: './lista-participantes.component.html',
  styleUrls: ['./lista-participantes.component.css']
})
export class ListaParticipantesComponent implements OnInit {
  @Input() idEvento!: number;
  participantes: any[] = [];
  participanteSeleccionado: any = {}; 

  constructor(
    private participantesService: ParticipantesService,
    private usuarioService: AuthService,
    private eventoService: EventoService 


  ) {}

  ngOnInit(): void {
    if (this.idEvento) {
      this.cargarParticipantes();
    }
  }

  cargarParticipantes(): void {
    console.log(this.idEvento+" Entrando CargarParticipantes")
    this.participantesService.getParticipantesConfirmados(this.idEvento).subscribe({
      next: (data) => {
        this.participantes = data;
      },
      error: (error) => {
        console.error('Error al obtener participantes confirmados:', error);
      }
    });
  }
  abrirModalEditar(participante: any): void {
    this.participanteSeleccionado = { ...participante }; // Crear una copia para edición
    const modal = new bootstrap.Modal(
      document.getElementById('editarParticipanteModal')!
    );
    modal.show();
  }
  toggleConfirmacion(participante: any): void {
    const nuevaConfirmacion = participante.confirmacion === 1 ? 0 : 1; // Alterna entre 1 y 0
    this.participantesService.confirmarAsistencia(participante.idUsuario, this.idEvento, nuevaConfirmacion).subscribe({
      next: (response) => {
        // Actualiza el estado de confirmación localmente
        participante.confirmacion = nuevaConfirmacion;
      },
      error: (error) => {
        console.error('Error al actualizar la confirmación:', error);
      }
    });
  }
  borrarConfirmacion(participante: any): void {
    if (confirm(`¿Estás seguro de que deseas eliminar la participación de ${participante.nombre}?`)) {
      this.participantesService.borrarParticipacion(participante.idParticipacion).subscribe({
        next: (response) => {
          alert('Participación eliminada con éxito.');
          window.location.reload();
  
          // Filtra el participante eliminado de la lista local
          this.participantes = this.participantes.filter(p => p.idParticipacion !== participante.idParticipacion);
        },
        error: (error) => {
          console.error('Error al borrar la participación:', error);
          alert('Hubo un problema al eliminar la participación. Por favor, inténtalo de nuevo.');
        }
      });
    }
  }
  guardarCambios(): void {
    // Crear un objeto con los nuevos datos del usuario
    const datosUsuario = {
      nombre: this.participanteSeleccionado.nombre,
      email: this.participanteSeleccionado.email
    };
  
    // Mostrar un cuadro de confirmación antes de proceder
    const confirmar = confirm(
      `¿Estás seguro de que deseas actualizar el perfil con los siguientes datos?\n\nNombre: ${datosUsuario.nombre}\nEmail: ${datosUsuario.email}`
    );
  
    if (confirmar) {
      // Llamar al servicio para actualizar otros datos del usuario (nombre, email)
      this.usuarioService.actualizarUsuario(this.participanteSeleccionado.idUsuario, datosUsuario).subscribe({
        next: () => {
          alert('Perfil actualizado con éxito');
          window.location.reload();
        },
        error: (err) => {
          console.error('Error al guardar cambios:', err);
          alert('Ocurrió un error al actualizar el perfil');
        },
      });
    } else {
      alert('La actualización del perfil ha sido cancelada.');
    }
  }

  descargarCertificado(idUsuario: number): void {
    if (!this.idEvento) {
      console.error('ID del evento no definido');
      return;
    }
  
    this.eventoService.descargarCertificado(idUsuario, this.idEvento).subscribe({
      next: (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = `certificado_${idUsuario}_${this.idEvento}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar el certificado:', err);
        alert('Hubo un problema al descargar el certificado. Intenta de nuevo.');
      },
    });
  }

}
