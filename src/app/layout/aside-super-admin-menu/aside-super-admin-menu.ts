import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';

import { SidebarService } from './sidebar.service';
import { AuthService } from '../../features/auth/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-aside-super-admin-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aside-super-admin-menu.html',
  styleUrl: './aside-super-admin-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideSuperAdminMenu {

  /* ========================
      SERVICIOS
  ======================== */
  private authSvc = inject(AuthService);
  protected sidebarSvc = inject(SidebarService);  // protected para el template
  private notifSvc = inject(NotificationService);

  /* ========================
      VIEW MODEL
  ======================== */
  vm$ = this.authSvc.user$.pipe(
    map(user => ({
      userName: user?.nombre ?? '',
      userRole: this.mapRole(user?.role ?? ''),
      userInitials: this.getInitials(user?.nombre ?? '')
    }))
  );

  /* ========================
      ESTADO LOCAL
  ======================== */
  sidebarExpanded = false;
  estanciasOpen = false;

  /* ========================
      SIDEBAR
  ======================== */
  openSidebar() { this.sidebarSvc.expand(); }
  closeSidebar() { this.sidebarSvc.collapse(); }
  toggleSidebar() { this.sidebarExpanded = !this.sidebarExpanded; }

  /* ========================
      ESTANCIAS SUBMENU
  ======================== */
  toggleEstancias() { this.estanciasOpen = !this.estanciasOpen; }
  openEstancias() { this.estanciasOpen = true; }
  closeEstancias() { this.estanciasOpen = false; }

  /* ========================
      AUTH
  ======================== */
  logout(): void {
    this.notifSvc.show(
      '¿Deseas cerrar sesión?',
      'warning'
    );
    // Si tienes un modal de confirmación úsalo aquí,
    // por ahora usamos confirm() nativo
    if (confirm('¿Deseas cerrar sesión?')) {
      this.authSvc.logout();
      this.notifSvc.success('Sesión cerrada correctamente');
    }
  }

  /* ========================
      HELPERS PRIVADOS
  ======================== */
  private mapRole(role: string): string {
    const roles: Record<string, string> = {
      superadmin: 'Super Administrador',
      admin: 'Administrador',
    };
    return roles[role] ?? role ?? 'Sin rol';
  }

  private getInitials(name: string): string {
    return name
      .split(' ')
      .filter(w => w.length > 0)
      .map(w => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
}