import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Asegúrate de importar HttpHeaders
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log("rol "+response.rol);
        console.log("token "+response.token);
        console.log("ID Usuario: " + response.idUsuario); // Asegúrate de que el servidor devuelva 'idUsuario'
     
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.rol); // Guarda el rol
        localStorage.setItem('idUsuario', response.idUsuario);
      })
    );
  }

  registrarUsuario(usuarioData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, usuarioData);
  }
  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post('http://localhost:3000/usuarios/logout', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).pipe(
        tap(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        })
    );
}
/*
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }*/

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
  
  getIdUsuario(): number | null {
    const idUsuario = localStorage.getItem('idUsuario');
    return idUsuario ? Number(idUsuario) : null; // Convierte el idUsuario a número y retorna, o null si no está presente
  }

 

  obtenerUsuario(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get(`${this.apiUrl}/obteneruser/${id}`,{ headers });
  }

  actualizarUsuario(idUsuario: number, usuarioData: { nombre: string, email: string }): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put(`${this.apiUrl}/update/${idUsuario}`, usuarioData,{ headers });
  }
  // auth.service.ts
actualizarContrasena(idUsuario: number, nuevaContrasena: string): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  return this.http.put(`${this.apiUrl}/update-password/${idUsuario}`, { nuevaContrasena },{ headers });
}

}
