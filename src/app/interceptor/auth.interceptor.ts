import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoadingService } from '../core/services/loading.service';
import { NotificationService } from '../core/services/notification.service';
import { AuthService } from '../features/auth/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingSvc = inject(LoadingService);
    const notifSvc = inject(NotificationService);
    const authSvc = inject(AuthService);
    const router = inject(Router);

    const token = authSvc.getToken();          // ← desde el servicio
    const isLoginRequest = req.url.includes('/auth/login');

    if (!isLoginRequest) loadingSvc.show();

    if (token) {
        req = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
    }

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            const message = resolveErrorMessage(error);

            if (error.status === 401 && !isLoginRequest) {
                authSvc.logout();                        // ← logout limpia token + redirige
                notifSvc.error(message);
            } else if (error.status === 401 && isLoginRequest) {
                // el login component maneja el error inline
            } else if (error.status === 403) {
                router.navigate(['/forbidden']);
                notifSvc.error(message);
            } else {
                notifSvc.error(message);
            }

            return throwError(() => ({ status: error.status, message }));
        }),
        finalize(() => {
            if (!isLoginRequest) loadingSvc.hide();
        })
    );
};

function resolveErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 400: return error.error?.message || 'Solicitud incorrecta';
        case 401: return 'Sesión expirada. Inicia sesión de nuevo.';
        case 403: return 'No tienes permisos para realizar esta acción';
        case 404: return 'Recurso no encontrado';
        case 422: return resolveValidationMessage(error);
        case 500: return 'Error interno del servidor. Intenta más tarde.';
        case 0: return 'Sin conexión. Verifica tu red.';
        default: return 'Ocurrió un error inesperado';
    }
}

function resolveValidationMessage(error: HttpErrorResponse): string {
    const errors = error.error?.errors;
    if (!errors) return error.error?.message || 'Error de validación';
    return (Object.values(errors) as string[][]).flat().join(', ');
}