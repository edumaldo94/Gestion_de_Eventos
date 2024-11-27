//login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service'; // Importa el servicio de autenticación
import { Router } from '@angular/router';  // Para redireccionar después del login
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null; 
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,  // Añade Router aquí
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Campo obligatorio y formato de email
      password: ['', [Validators.required, Validators.minLength(3)]] 
    });
  
    // Obtener el email de los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.loginForm.patchValue({ email: params['email'] });  // Establecer el email en el formulario
      }
    });
  }

  onLogin(): void {
    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        const rol = this.authService.getRole();
        console.log('Login exitoso', rol);
       // const redirectUrl = rol === '1' ? '/eventos-organizador' : '/eventos-asistente';
       const redirectUrl = rol === '1' ? '/evento/eventos-organizador' : '/evento/eventos-asistente';

        this.router.navigate([redirectUrl]);
      },
      error: (error) => {
        console.error('Error en el login', error);
        if (error.status === 404) {
          this.errorMessage = 'El correo ingresado no existe en la base de datos.';
        } else if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
        }
      }
    });
  }
}
