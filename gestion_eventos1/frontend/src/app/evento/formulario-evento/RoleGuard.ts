import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    const user = this.authService.getRole(); // Suponiendo que tienes un servicio para obtener el usuario actual
    const rolesPermitidos = ['1', '2']; // Los roles que pueden acceder a la página

    if (user === '1' || user === '2') {
      return true; // El usuario tiene un rol permitido
    } else {
      this.router.navigate(['/inicio']); // Redirigir a la página de login si no tiene los permisos
      return false; // No permitir el acceso
    }
  }
}
