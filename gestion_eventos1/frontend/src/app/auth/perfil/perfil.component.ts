import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service'; // Servicio para interactuar con la API

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  usuario: any = {};

  constructor(private usuarioService: AuthService) {}

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    const idUsuario = localStorage.getItem('idUsuario'); // Obtén el ID del usuario del localStorage o token
    console.log(idUsuario+"  asddddddddddddddddddddddddddddd")
    if (idUsuario) {
      this.usuarioService.obtenerUsuario(idUsuario).subscribe({
        next: (data) => {
          this.usuario = data;
        },
        error: (err) => {
          console.error('Error al cargar usuario:', err);
        },
      });
    }
  }

  /*guardarCambios(): void {
    // Crear un objeto con los nuevos datos del usuario, por ejemplo nombre y email
    const datosUsuario = {
      nombre: this.usuario.nombre,  // Asume que this.usuario tiene el campo nombre
      email: this.usuario.email     // Asume que this.usuario tiene el campo email
    };
  
    // Llamar al servicio para actualizar el usuario, pasando el idUsuario y los nuevos datos
    this.usuarioService.actualizarUsuario(this.usuario.idUsuario, datosUsuario).subscribe({
      next: () => {
        alert('Perfil actualizado con éxito');
        console.log('ID de usuario actualizado:', this.usuario.idUsuario);
      },
      error: (err) => {
        console.error('Error al guardar cambios:', err);
        alert('Ocurrió un error al actualizar el perfil: ' + this.usuario.idUsuario);
      },
    });
  }*/
    guardarCambios(): void {
      // Crear un objeto con los nuevos datos del usuario
      const datosUsuario = {
        nombre: this.usuario.nombre,
        email: this.usuario.email
      };
    
      // Si se ha proporcionado una nueva contraseña, incluirla en los datos
      if (this.usuario.nuevaContrasena && this.usuario.nuevaContrasena === this.usuario.confirmarContrasena) {
        // Llamar al servicio para actualizar la contraseña
        this.usuarioService.actualizarContrasena(this.usuario.idUsuario, this.usuario.nuevaContrasena).subscribe({
          next: () => {
            alert('Contraseña actualizada con éxito');
          },
          error: (err) => {
            console.error('Error al actualizar la contraseña:', err);
            alert('Ocurrió un error al cambiar la contraseña');
          }
        });
      } else {
        // Si no hay nueva contraseña o no coinciden
        alert('Las contraseñas no coinciden o no se ha proporcionado una nueva contraseña');
      }
    
      // Llamar al servicio para actualizar otros datos del usuario (nombre, email)
      this.usuarioService.actualizarUsuario(this.usuario.idUsuario, datosUsuario).subscribe({
        next: () => {
          alert('Perfil actualizado con éxito');
        },
        error: (err) => {
          console.error('Error al guardar cambios:', err);
          alert('Ocurrió un error al actualizar el perfil');
        },
      });
    }
    
}
