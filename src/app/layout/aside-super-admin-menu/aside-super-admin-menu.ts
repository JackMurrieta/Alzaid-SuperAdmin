import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarService } from './sidebar.service';
import { AuthService, User } from '../../features/auth/auth.service';

@Component({
  selector: 'app-aside-super-admin-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aside-super-admin-menu.html',
  styleUrl: './aside-super-admin-menu.scss',
})
export class AsideSuperAdminMenu implements OnInit {

  userName = '';
  userRole = '';

  constructor(
    public sidebarSvc: SidebarService,
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
    this.authSvc.user$.subscribe((user: User | null) => {
      if (user) {
        this.userName = user.nombre;
        this.userRole = this.mapRole(user.role);
      } else {
        this.userName = '';
        this.userRole = '';
      }
    });
  }

  /** Mapea roles a etiquetas más amigables */
  mapRole(role: string): string {
    switch (role) {
      case 'superadmin': return 'Super Administrador';
      case 'admin': return 'Administrador';
      default: return role || 'Sin rol';
    }
  }

  /** Iniciales del usuario */
  get userInitials(): string {
    return this.userName
      .split(' ')
      .map(w => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  /* SIDEBAR */
  sidebarExpanded = false;

  openSidebar() { this.sidebarSvc.expand(); }
  closeSidebar() { this.sidebarSvc.collapse(); }
  toggleSidebar() { this.sidebarExpanded = !this.sidebarExpanded; }

  /* SUBMENÚ ESTANCIAS */
  estanciasOpen = false;

  toggleEstancias() { this.estanciasOpen = !this.estanciasOpen; }
  openEstancias() { this.estanciasOpen = true; }
  closeEstancias() { this.estanciasOpen = false; }

  /* LOGOUT */
  logout() {
    const confirmLogout = confirm('¿Deseas cerrar sesión?');
    if (confirmLogout) {
      this.authSvc.logout();
    }
  }
}