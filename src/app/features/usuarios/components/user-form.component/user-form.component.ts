import { Component, output, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { User, UserRole } from '../../models/user.model';
import { UsuariosService } from '../../service/usuarios.service';

interface RoleOption {
  value: UserRole;
  label: string;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {

  cancelar = output<void>();
  usuarioCreado = output<User>();

  private fb = inject(FormBuilder);
  private usuariosSvc = inject(UsuariosService);

  formSubmitted = false;
  showPassword = false;
  toastVisible = false;
  toastMessage = '';

  /* ── Catálogo de roles tipado desde el modelo ── */
  readonly roles: RoleOption[] = [
    { value: 'superadmin', label: 'Super Administrador' },
    { value: 'admin', label: 'Administrador' },
    { value: 'coordinator', label: 'Coordinador' },
    { value: 'nurse', label: 'Enfermero/a' },
    { value: 'formal_caregiver', label: 'Cuidador Formal' },
    { value: 'informal_caregiver', label: 'Cuidador Informal' },
  ];

  form = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    lastNameSecond: [''],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    role: ['' as UserRole | '', Validators.required],
    centerId: [''],
  });

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!ctrl && ctrl.invalid && (ctrl.touched || this.formSubmitted);
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.form.invalid) return;

    const payload = this.form.getRawValue() as User;

    this.usuariosSvc.crearUsuario(payload).subscribe({
      next: (created) => {
        this.showToast('Usuario creado correctamente');
        setTimeout(() => this.usuarioCreado.emit(created), 1200);
      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
        this.showToast('Error al crear usuario, intenta de nuevo');
      }
    });
  }

  onCancel(): void {
    this.cancelar.emit();
  }

  private showToast(msg: string): void {
    this.toastMessage = msg;
    this.toastVisible = true;
    setTimeout(() => this.toastVisible = false, 3000);
  }
}