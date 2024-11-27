import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';  // Asegúrate de tener el AuthService para manejar el registro
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      idRol: ['', Validators.required]  // Campo para seleccionar el rol
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      this.authService.registrarUsuario(this.registroForm.value).subscribe(response => {
        alert('Usuario registrado con éxito ');
             
      
        this.router.navigate(['/inicio'], { queryParams: { email: this.registroForm.value.email } });
        this.registroForm = this.formBuilder.group({
          nombre: [''],
          email: [''],
          password: [''],
          idRol: ['']  // Campo para seleccionar el rol
        });
      }, error => {
        console.error('Error al registrar usuario', error);
      });
    }
  }
}
