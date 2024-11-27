//lista-de-eventos.component.ts
// lista-de-eventos.component.ts
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EventoService } from '../../service/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
declare const bootstrap: any;
declare var $: any;

@Component({
  selector: 'app-lista-de-eventos',
  templateUrl: './lista-de-eventos.component.html',
  styleUrls: ['./lista-de-eventos.component.css']
})
export class ListaDeEventosComponent implements OnInit, AfterViewInit {
  eventos: any[] = [];
  role?: string;
  idUsuario?: number;
  eventoSeleccionado: any = {}; 


  constructor(
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.role = this.route.snapshot.data['role'];
    this.idUsuario = Number(localStorage.getItem('idUsuario'));
    this.loadEventos();
  
  }

  ngAfterViewInit(): void {
    this.initializeDataTable(); // Inicializar DataTable después de que la vista esté lista
  }


  editarEvento(idEvento: number): void {
    // Selecciona el evento actual para editar
    const evento = this.eventos.find((e) => e.idEvento === idEvento);
    if (evento) {
      // Formatea la fecha si existe y es válida
      this.eventoSeleccionado = {
        ...evento,
        fecha: evento.fecha ? evento.fecha.split('T')[0] : '', // Convierte la fecha al formato YYYY-MM-DD
      };
  
      console.log('Evento seleccionado:', this.eventoSeleccionado); // Depuración
  
      // Abre el modal
      const modal = new bootstrap.Modal(document.getElementById('editarEventoModal'));
      modal.show();
    }
  }
  

loadEventos(): void {
  // Verificar si idUsuario tiene un valor
  if (this.idUsuario !== undefined) {
    this.eventoService.getEventosQueAsisto(this.idUsuario).subscribe({
      next: (data) => {
        this.eventos = data;
      },
      error: (error) => {
        console.error('Error al cargar los eventos', error);
      }
    });
  } else {
    console.error('El ID de usuario no está disponible');
  }
}

  initializeDataTable(): void {
    setTimeout(() => {
        if ($('#tablaEventos').length) {
            $('#tablaEventos').DataTable();
        }
    }, 100); // Espera a que el DOM esté listo
}


  puedeEditar(): boolean {
    return this.role === 'Organizador';
  }

  verDetalles(idEvento: number): void {
    this.router.navigate(['/evento', idEvento]);
  }

  /*editarEvento(id: number): void {
    this.router.navigate(['/editar-evento', id]);
  }*/

  borrarEvento(id: number): void {
    // Mostrar un cartel de confirmación
    const confirmar = confirm('¿Estás seguro de que deseas borrar este evento? Esta acción no se puede deshacer.');

    if (confirmar) {
      this.eventoService.borrarEvento(id).subscribe({
        next: () => {
          alert('Evento borrado exitosamente.');
          // Actualizar la lista de eventos sin recargar la página
          this.eventos = this.eventos.filter((evento) => evento.idEvento !== id);
        },
        error: (error) => {
          console.error('Error al borrar el evento', error);
          alert('Hubo un error al intentar borrar el evento.');
        }
      });
    }
  }
  guardarCambios(): void {
    // Muestra un cuadro de confirmación antes de guardar
    const confirmar = confirm('¿Estás seguro de que deseas guardar los cambios?');
  
    if (confirmar) {
      // Llama al servicio para guardar cambios
      this.eventoService.actualizarEvento(this.eventoSeleccionado.idEvento, this.eventoSeleccionado).subscribe({
        next: () => {
          alert('Evento actualizado con éxito');
          // Actualiza la lista localmente
          const index = this.eventos.findIndex((e) => e.idEvento === this.eventoSeleccionado.idEvento);
          if (index !== -1) {
            this.eventos[index] = { ...this.eventoSeleccionado };
          }
  
          // Cierra el modal
          const modalElement = document.getElementById('editarEventoModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal?.hide();
          }
  
          // Recargar la página
          window.location.reload();
        },
        error: (err) => console.error('Error al actualizar evento:', err)
      });
    } else {
      console.log('La actualización ha sido cancelada.');
    }
  }
  
}
