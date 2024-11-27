//formulario-evento.component.ts
import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../service/evento.service'; // Asegúrate de importar tu servicio de eventos
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-evento',
  templateUrl: './formulario-evento.component.html',
  styleUrls: ['./formulario-evento.component.css']
})
export class FormularioEventoComponent implements OnInit {
  evento = {
    nombre: '',
    fecha: '',
    ubicacion: '',
    descripcion: ''
  };

  constructor(private eventoService: EventoService, private router: Router) {}

  ngOnInit(): void {}

  crearEvento(): void {
    const formData = new FormData();
    formData.append('nombre', this.evento.nombre);
    formData.append('fecha', this.evento.fecha);
    formData.append('ubicacion', this.evento.ubicacion);
    formData.append('descripcion', this.evento.descripcion);
  
    // Si hay una imagen seleccionada
    const imagenInput = document.querySelector('#imagen') as HTMLInputElement;
    if (imagenInput?.files?.[0]) {
      formData.append('imagen', imagenInput.files[0]);
    }
  
    this.eventoService.crearEvento(formData).subscribe(
      (response) => {
        alert('Evento creado con éxito');
        this.router.navigate(['/evento/eventos-organizador']);
      },
      (error) => {
        console.error('Error al crear el evento:', error);
        alert('Hubo un error al crear el evento');
      }
    );
  }
}
