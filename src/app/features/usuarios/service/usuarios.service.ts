// src/app/service/estancia.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsuariosService {

  private readonly API = environment.apiUrl;

  constructor(private http: HttpClient) { }

  crearUsuario(payload: User): Observable<any> {
    return this.http.post(`${this.API}/auth/register`, payload);
  }
  /** 
   * Falta endopoint para obtener usuarios,
   *     getUsuarios(): Observable<any[]> {
      return this.http.get<any[]>(`${this.API}/users`);
    }
  */
}