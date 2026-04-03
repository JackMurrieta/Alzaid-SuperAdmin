import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../core/services/loading.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');
    const loadingSvc = inject(LoadingService);

    //mostrar loading en cada peticion a la api
    loadingSvc.show();

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(req).pipe(
        finalize(() => {
            // ocultar loading siempre (success o error)
            loadingSvc.hide();
        })
    );
};