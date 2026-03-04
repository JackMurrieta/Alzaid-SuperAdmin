import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-aside-super-admin-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aside-super-admin-menu.html',
  styleUrl: './aside-super-admin-menu.scss',
})
export class AsideSuperAdminMenu {

  constructor(public sidebarSvc: SidebarService) { }

  openSidebar() { this.sidebarSvc.expand(); }
  closeSidebar() { this.sidebarSvc.collapse(); }

  /* ── INFO DE USUARIO (obtenida desde backend) ── */
  userName = 'Juan Pérez';
  userRole = 'Super Usuario';

  /** Iniciales calculadas para el avatar mini */
  get userInitials(): string {
    return this.userName
      .split(' ')
      .map(w => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  /* ── ESTADO DEL SIDEBAR (para mobile toggle) ── */
  sidebarExpanded = false;

  /** Abre/cierra manualmente (útil en mobile con un botón) */
  toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;
  }

  /* ── SUBMENÚ ESTANCIAS ── */
  estanciasOpen = false;

  toggleEstancias() {
    this.estanciasOpen = !this.estanciasOpen;
  }

  openEstancias() {
    this.estanciasOpen = true;
  }

  closeEstancias() {
    this.estanciasOpen = false;
  }

  /* ── LOGOUT ── */
  logout() {
    console.log('Cerrar sesión');
    // Limpiar token y redirigir
  }
}
