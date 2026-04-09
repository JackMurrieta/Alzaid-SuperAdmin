import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsideSuperAdminMenu } from '../../../../layout/aside-super-admin-menu/aside-super-admin-menu';
/*Crear tpBar */
import { TopbarComponent } from '../../../../layout/topbar/topbar.component';
import { UsuariosTableComponent } from '../../components/user-table.component/user-table.component';
import { SidebarService } from '../../../../layout/aside-super-admin-menu/sidebar.service';
import { UsuariosService } from '../../service/usuarios.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  imports: [
    CommonModule,
    AsideSuperAdminMenu,
    TopbarComponent,
    UsuariosTableComponent,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  constructor(
    public sidebarSvc: SidebarService,
    private usuariosSvc: UsuariosService,
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

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

  // ── GET /users ──
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

    // Datos de ejemplo hasta que el endpoint esté listo
    this.usuarios = [];
    this.totalUsuarios = 0;
    this.cargando = false;
  }

  // ── Handlers tabla ──
  onView(usuario: User): void {
    this.selectedUsuario = usuario;
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedUsuario = null;
  }

  onEdit(usuario: User): void {
    // TODO: abrir modal de edición
    console.log('Editar usuario:', usuario);
  }

  onToggleBloqueo(usuario: User): void {
    // TODO: llamar endpoint PATCH /users/:id/block
    console.log(`${usuario.blocked ? 'Desbloquear' : 'Bloquear'} usuario:`, usuario);
  }

  onDelete(usuario: User): void {
    // TODO: confirmar y llamar endpoint DELETE /users/:id
    console.log('Eliminar usuario:', usuario);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onNewUsuario(): void {
    // TODO: abrir modal de registro de usuario
  }
}