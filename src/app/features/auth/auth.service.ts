import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

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

export interface User {
    id: string;
    nombre: string;
    role: string;
    paciente: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly url = `${environment.apiUrl}/auth/login`;

    // 🔥 estado global del usuario
    private userSubject = new BehaviorSubject<User | null>(
        this.getUserFromStorage()
    );

    user$ = this.userSubject.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    login(payload: LoginPayload): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.url, payload).pipe(
            tap(res => {
                localStorage.setItem('token', res.token);

                const user: User = {
                    id: res.id_usuario,
                    nombre: res.nombre_usuario,
                    role: res.role,
                    paciente: res.id_paciente
                };

                localStorage.setItem('user', JSON.stringify(user));

                this.userSubject.next(user);
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        this.userSubject.next(null);

        this.router.navigate(['/auth/login']);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    private getUserFromStorage(): User | null {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}