import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

import { AuthService, LoginPayload } from '../auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush  // ← evita NG0100
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authSvc = inject(AuthService);
  private router = inject(Router);
  private notifSvc = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submitted = false;
  isLoading = false;
  errorMsg: string | null = null;
  showPass = false;

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!ctrl && ctrl.invalid && (ctrl.touched || this.submitted);
  }

  togglePass(): void { this.showPass = !this.showPass; }

  onSubmit(): void {
    this.submitted = true;
    this.errorMsg = null;

    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const payload = this.form.value as LoginPayload;
    this.isLoading = true;
    this.cdr.markForCheck();

    this.authSvc.login(payload).pipe(
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck(); // ← markForCheck en lugar de detectChanges
      })
    ).subscribe({
      next: () => {
        this.router.navigate(['/estancias']);
      },
      error: (err) => {
        this.errorMsg = err.status === 401 ? 'Correo o contraseña incorrectos'
          : err.status === 0 ? 'Sin conexión. Verifica tu red'
            : 'Error inesperado. Intenta de nuevo';

        this.notifSvc.error(this.errorMsg);
        this.cdr.markForCheck();
      }
    });
  }
}