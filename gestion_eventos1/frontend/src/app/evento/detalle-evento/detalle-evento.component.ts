//detalle-evento.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { EventoService } from '../../service/evento.service';
import { AuthService } from '../../auth/services/auth/auth.service';  // Asegúrate de importar el servicio
import { ParticipantesService } from '../../service/participantes.service';
declare const bootstrap: any;
declare var $: any;
@Component({
  selector: 'app-detalle-evento',
  templateUrl: './detalle-evento.component.html',
  styleUrls: ['./detalle-evento.component.css']
})
export class DetalleEventoComponent implements OnInit {
  evento: any = {}; // Inicializar como un objeto vacío
  selectedFile: File | null = null;
  usuarioLogueado: boolean = false;
  rol: string | null | undefined = ''; // Acepta string, null o undefined
  idEvento!: number; // ID del evento actual
  asistiendo: boolean = false; // Estado de la asistencia

  constructor(
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router,
    private  authService: AuthService,
    private participantesService: ParticipantesService,
  ) {}
  
 
  ngOnInit(): void {
    this.usuarioLogueado = !!localStorage.getItem('usuarioToken');  // Verificamos el token guardado
    this.rol = this.authService.getRole();

    const id = +this.route.snapshot.paramMap.get('idEvento')!;
    this.idEvento = +this.route.snapshot.paramMap.get('idEvento')!;
    this.eventoService.getEventoDetalle(id).subscribe((data) => {
    
      this.evento = data[0];  // Asegurarse de acceder al primer evento si el resultado es un array
   
    });
    this.verificarAsistencia(id);
  }
  puedeEditar(): boolean {
    return this.rol === this.rol; // Ajusta según el valor real de los roles
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.selectedFile = input.files[0];
    }
  }
  editarEvento(): void {
    if (this.evento) {
      // Verifica que la fecha existe y es válida
      if (this.evento.fecha) {
        // Convierte la fecha al formato YYYY-MM-DDTHH:mm (formato que requiere el campo datetime-local)
        const fecha = new Date(this.evento.fecha);
        this.evento.fecha = fecha.toISOString().split('T')[0]; // Esto convertirá la fecha a "YYYY-MM-DDTHH:mm"
      }
  
      // Mostrar el modal para editar el evento
      const modalElement = document.getElementById('editarEventoModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }
  
  guardarCambios(): void {
    const confirmar = confirm('¿Estás seguro de que deseas guardar los cambios?');
    if (confirmar) {
      // Crear un FormData para incluir los datos del evento y la imagen
      const formData = new FormData();
      formData.append('nombre', this.evento.nombre);
      formData.append('descripcion', this.evento.descripcion);
      formData.append('ubicacion', this.evento.ubicacion);
      formData.append('fecha', this.evento.fecha);
  
      // Verificar si hay una imagen seleccionada o si debe mantenerse la actual
      if (this.selectedFile) {
        formData.append('imagen', this.selectedFile);
      } else if (this.evento.imagen) {
        formData.append('imagenActual', this.evento.imagen); // Agrega el valor de la imagen actual
      }
  
      // Llamar al servicio para actualizar el evento
      this.eventoService.actualizarEvento(this.evento.idEvento, formData).subscribe({
        next: () => {
          alert('Evento actualizado con éxito.');
          // Cerrar el modal
          const modalElement = document.getElementById('editarEventoModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal?.hide();
          }
          // Recargar la página
          window.location.reload();
        },
        error: (err) => {
          console.error('Error al actualizar el evento:', err);
          alert('Hubo un error al actualizar el evento.');
        }
      });
    }
  }
  
  
  verificarAsistencia(idEvento: number): void {
    this.participantesService.verificarParticipacion(idEvento).subscribe((respuesta) => {
    
      this.asistiendo = respuesta.asistiendo;
    });
  }

  confirmarAsistencia(): void {
    if (this.asistiendo) {
      // Cancelar la asistencia
      if (confirm('¿Estás seguro de que deseas cancelar tu asistencia?')) {
        this.participantesService.cancelarParticipacion(this.evento.idEvento).subscribe({
          next: () => {
            alert('Has cancelado tu asistencia.');
            this.asistiendo = false;
            this.verificarAsistencia(this.evento.idEvento);
            window.location.reload();
          },
          error: (err) => {
            console.error(err);
            alert('Hubo un problema al cancelar tu asistencia.');
          }
        });
      }
    } else {
      // Registrar la asistencia
      if (confirm('¿Estás seguro de que deseas asistir a este evento?')) {
        this.participantesService.registrarParticipacion(this.evento.idEvento).subscribe({
          next: () => {
            alert('¡Te has registrado exitosamente!');
            this.asistiendo = true;
            this.verificarAsistencia(this.evento.idEvento);  
            window.location.reload();
          },
          error: (err) => {
            console.error(err);
            alert('El evento ya ha pasado. No puedes registrarte.');
          }
        });
      }
    }
  }
}
