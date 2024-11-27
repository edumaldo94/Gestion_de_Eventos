import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth/auth.service'; // Asegúrate de tener este servicio

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const role = this.authService.getRole(); // Suponiendo que el servicio retorna el rol del usuario
    if (role === '1') {
      return true; // El organizador puede acceder al formulario
    } else {
      this.router.navigate(['/evento/eventos-asistente']); // Redirigir a la lista de eventos si no es organizador
      return false;
    }
  }
  
}
