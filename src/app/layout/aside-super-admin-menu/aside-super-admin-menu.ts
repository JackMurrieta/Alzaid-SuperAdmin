import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aside-super-admin-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aside-super-admin-menu.html',
  styleUrl: './aside-super-admin-menu.scss',
})
export class AsideSuperAdminMenu {

  /*info obtenida desde backend*/
  userName = 'Juan Pérez';
  userRole = 'Super Usuario';

  estanciasOpen = false;

  /* Click — abre/cierra */
  toggleEstancias() {
    this.estanciasOpen = !this.estanciasOpen;
  }

  /* Hover — abre al entrar el mouse */
  openEstancias() {
    this.estanciasOpen = true;
  }

  /* Hover — cierra al salir el mouse */
  closeEstancias() {
    this.estanciasOpen = false;
  }

  logout() {
    console.log('Cerrar sesión');
    // Aquí limpias token y rediriges
  }


}
