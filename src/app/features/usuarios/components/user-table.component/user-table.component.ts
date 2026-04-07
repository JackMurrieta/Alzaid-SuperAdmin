import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserRole } from '../../models/user.model';

@Component({
  selector: 'app-usuarios-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UsuariosTableComponent implements OnChanges {
  @Input() usuarios: User[] = [];
  @Input() totalUsuarios = 0;
  @Input() currentPage = 1;
  @Input() totalPages = 1;

  @Output() viewUsuario = new EventEmitter<User>();
  @Output() editUsuario = new EventEmitter<User>();
  @Output() toggleBloqueo = new EventEmitter<User>();
  @Output() deleteUsuario = new EventEmitter<User>();
  @Output() pageChange = new EventEmitter<number>();

  pages: number[] = [];

  ngOnChanges() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onView(u: User) { this.viewUsuario.emit(u); }
  onEdit(u: User) { this.editUsuario.emit(u); }
  onToggle(u: User) { this.toggleBloqueo.emit(u); }
  onDelete(u: User) { this.deleteUsuario.emit(u); }
  onPageChange(p: number) { this.pageChange.emit(p); }

  getInitials(u: User): string {
    return `${u.name[0]}${u.lastName[0]}`.toUpperCase();
  }

  getRolLabel(role: UserRole): string {
    const labels: Record<UserRole, string> = {
      superadmin: 'Super Admin',
      admin: 'Administrador',
      formal_caregiver: 'Cuidador Formal',
      informal_caregiver: 'Cuidador Informal',
      coordinator: 'Coordinador',
      nurse: 'Enfermero/a',
    };
    return labels[role] ?? role;
  }

  getRolClass(role: UserRole): string {
    const classes: Record<UserRole, string> = {
      superadmin: 'rol-superadmin',
      admin: 'rol-admin',
      formal_caregiver: 'rol-caregiver',
      informal_caregiver: 'rol-caregiver',
      coordinator: 'rol-coordinator',
      nurse: 'rol-nurse',
    };
    return classes[role] ?? '';
  }

  getEstatusClass(u: User): string {
    if (u.blocked) return 'badge-blocked';
    if (u.active) return 'badge-active';
    return 'badge-inactive';
  }

  getEstatusLabel(u: User): string {
    if (u.blocked) return 'Bloqueado';
    if (u.active) return 'Activo';
    return 'Inactivo';
  }
}