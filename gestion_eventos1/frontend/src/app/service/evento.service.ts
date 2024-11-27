//evento.service
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Asegúrate de importar HttpHeaders
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = 'http://localhost:3000/evento'; // URL de tu API

  constructor(private http: HttpClient) {}

  /*getEventos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/eve-todos`);
  }*/
  getEventos(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get(`${this.apiUrl}/eve-todos`, { headers });
  }
  getEventoDetalle(idEvento: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get(`${this.apiUrl}/eve-detalle/${idEvento}`,{ headers });
  
  }

  crearEvento(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post(`${this.apiUrl}/eve-crear`, data,{ headers });
  }

  actualizarEvento(id: number, data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put(`${this.apiUrl}/eve-actualizar/${id}`, data,{ headers });
  }

  borrarEvento(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete(`${this.apiUrl}/eve-borrar/${id}`, { headers });
  }
  getEventosQueAsisto(idUsuario: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    console.log("usuario id "+idUsuario)
    return this.http.get(`${this.apiUrl}/eve-queasisto/${idUsuario}`, { headers });
  }
  
  descargarCertificado(idUsuario: number, idEvento: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get(`${this.apiUrl}/certificado/${idUsuario}/${idEvento}`, {
      headers ,responseType: 'blob', // Asegura que el contenido sea tratado como archivo
    });
  }
}
