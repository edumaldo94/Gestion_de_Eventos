//participantes.service
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Asegúrate de importar HttpHeaders
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ParticipantesService {
  private apiUrl = 'http://localhost:3000/participacion'; // URL de tu API

  constructor(private http: HttpClient) {}

  /*getEventos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/eve-todos`);
  }*/
    getParticipantesConfirmados(idEvento: number): Observable<any[]> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.get<any[]>(`${this.apiUrl}/p-confirmados/${idEvento}`, { headers });
      }


      registrarParticipacion(idEvento: number): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        
        // Decodifica el token para extraer el idUsuario
        const token = localStorage.getItem('token');
        let idUsuario: number | null = null;
        
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del token
          idUsuario = payload.idUsuario; // Asegúrate de que tu token incluya el idUsuario
        }
        
        if (!idUsuario) {
          throw new Error('El ID del usuario no se pudo obtener del token.');
        }
        
        // Envía ambos parámetros al backend
        return this.http.post(
          `${this.apiUrl}/p-registro`,
          { idUsuario, idEvento },
          { headers }
        );
      }
      
      verificarParticipacion(idEvento: number): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.get<{ asistiendo: boolean }>(`${this.apiUrl}/verificar/${idEvento}`, { headers });
      }
      

cancelarParticipacion(idEvento: number): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  return this.http.delete(`${this.apiUrl}/p-cancelar/${idEvento}`, { headers });
}
confirmarAsistencia(idUsuario: number, idEvento: number, confirmacion: number): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  return this.http.put(`${this.apiUrl}/p-asistencia/${idUsuario}/${idEvento}`, { confirmacion }, { headers });
}
borrarParticipacion(id: number): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  return this.http.delete(`${this.apiUrl}/p-delet/${id}`, { headers });
}

}
