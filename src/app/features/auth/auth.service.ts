import { Injectable, inject } from '@angular/core';
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
    centerId: string;
    token: string;
}

export interface User {
    id: string;
    nombre: string;
    role: string;
    paciente: string | null;
    centerId: string;  // ← viene en la respuesta, guárdalo
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    private http = inject(HttpClient);
    private router = inject(Router);

    private readonly loginUrl = `${environment.apiUrl}/auth/login`;

    private userSubject = new BehaviorSubject<User | null>(
        this.getUserFromStorage()
    );

    readonly user$ = this.userSubject.asObservable();  // ← readonly

    login(payload: LoginPayload): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.loginUrl, payload).pipe(
            tap(res => {
                const user: User = {
                    id: res.id_usuario,
                    nombre: res.nombre_usuario,
                    role: res.role,
                    paciente: res.id_paciente,
                    centerId: res.centerId  // ← mapea el centerId
                };
                this.persistSession(res.token, user);
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

    getToken(): string | null {
        return localStorage.getItem('token');  // ← útil para el interceptor
    }

    private persistSession(token: string, user: User): void {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
    }

    private getUserFromStorage(): User | null {
        try {
            const raw = localStorage.getItem('user');
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;  // ← evita crash si el JSON está corrupto
        }
    }
}