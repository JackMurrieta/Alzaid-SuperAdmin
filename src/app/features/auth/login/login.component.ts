import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  submitted = false;
  isLoading = false;
  errorMsg = '';
  showPass = false;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!ctrl && ctrl.invalid && (ctrl.touched || this.submitted);
  }

  togglePass(): void { this.showPass = !this.showPass; }

  onSubmit(): void {
    this.submitted = true;
    this.errorMsg = '';
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.isLoading = true;
    this.authSvc.login(this.form.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/estancias']); // ajusta tu ruta destino
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err.status === 401
          ? 'Correo o contraseña incorrectos'
          : 'Error al conectar con el servidor';
      },
    });
  }
}