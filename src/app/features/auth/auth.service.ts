import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    id_usuario: string;
    nombre_usuario: string;
    role: string;
    id_paciente: string | null;
    token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly url = '/api/auth/login';

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    login(payload: LoginPayload): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.url, payload).pipe(
            tap(res => {
                localStorage.setItem('token', res.token);

                const user = {
                    id: res.id_usuario,
                    nombre: res.nombre_usuario,
                    role: res.role,
                    paciente: res.id_paciente
                };

                localStorage.setItem('user', JSON.stringify(user));
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/auth/login']);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
}