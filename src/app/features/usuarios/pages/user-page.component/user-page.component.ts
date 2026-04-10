// user-page.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { ShellLayoutComponent } from '../../../../layout/shell-layout.component/shell-layout.component';
import { TopbarComponent } from '../../../../layout/topbar/topbar.component';
import { UsuariosTableComponent } from '../../components/user-table.component/user-table.component';
import { UsuariosService } from '../../service/usuarios.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  imports: [
    ShellLayoutComponent,
    TopbarComponent,
    UsuariosTableComponent,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  private usuariosSvc = inject(UsuariosService);

  // ── Estado ──
  cargando = false;
  errorCarga = false;

  // ── Datos ──
  usuarios: User[] = [];
  totalUsuarios = 0;
  currentPage = 1;
  totalPages = 1;

  // ── Modal ver ──
  selectedUsuario: User | null = null;
  showViewModal = false;

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.errorCarga = false;

    // TODO: descomentar cuando el endpoint esté listo
    // this.usuariosSvc.getUsuarios().subscribe({
    //   next: (data: User[]) => {
    //     this.usuarios      = data;
    //     this.totalUsuarios = data.length;
    //     this.totalPages    = Math.ceil(data.length / 10) || 1;
    //     this.cargando      = false;
    //   },
    //   error: (err) => {
    //     console.error('Error al cargar usuarios:', err);
    //     this.errorCarga = true;
    //     this.cargando   = false;
    //   }
    // });

    this.usuarios = [];
    this.totalUsuarios = 0;
    this.cargando = false;
  }

  onView(usuario: User): void {
    this.selectedUsuario = usuario;
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedUsuario = null;
  }

  onEdit(usuario: User): void {
    console.log('Editar usuario:', usuario);
  }

  onToggleBloqueo(usuario: User): void {
    console.log(`${usuario.blocked ? 'Desbloquear' : 'Bloquear'} usuario:`, usuario);
  }

  onDelete(usuario: User): void {
    console.log('Eliminar usuario:', usuario);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onNewUsuario(): void {
    // TODO: abrir modal de registro
  }
}