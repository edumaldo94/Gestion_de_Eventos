import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AsistenteGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const role = this.authService.getRole();
    
    if (role === '2') {  // Si el rol es Asistente
      return true;
    } else {
      this.router.navigate(['/inicio']);  // Redirigir al organizador si no es asistente
      return false;
    }
  }
}
