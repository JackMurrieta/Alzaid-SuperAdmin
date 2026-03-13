// src/app/service/estancia.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstanciaPayload } from '../components/formRegistro/formRegistro.component';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EstanciaService {

    private readonly API = environment.apiUrl;

    constructor(private http: HttpClient) { }

    crearCentro(payload: EstanciaPayload): Observable<any> {
        return this.http.post(`${this.API}/centers`, payload);
    }

    getCentros(): Observable<any[]> {
        return this.http.get<any[]>(`${this.API}/centers`);
    }
}