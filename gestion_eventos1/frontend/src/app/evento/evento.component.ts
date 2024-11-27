import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../app/auth/services/auth/auth.service';  // Asegúrate de importar el servicio

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  usuarioLogueado: boolean = false;
  rol: string | null | undefined = ''; // Acepta string, null o undefined

  constructor(private router: Router,private  authService: AuthService) {}

  ngOnInit(): void {
    // Comprobamos si el usuario está logueado utilizando el servicio de autenticación
    this.usuarioLogueado = !!localStorage.getItem('usuarioToken');  // Verificamos el token guardado
    this.rol = this.authService.getRole();
  }

  cerrarSesion(): void {
    const confirmar = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (confirmar) {
        this.authService.logout().subscribe({
            next: () => {
                localStorage.clear(); // Limpia todo el almacenamiento local
                this.router.navigate(['/inicio'], { replaceUrl: true }); // Reemplaza la URL actual en el historial
            },
            error: (err) => {
                console.error('Error al cerrar sesión:', err);
            }
        });
    }
}




}
