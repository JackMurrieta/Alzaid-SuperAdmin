// shell-layout.component.ts
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideSuperAdminMenu } from '../aside-super-admin-menu/aside-super-admin-menu';
import { TopbarComponent, TopbarAction } from '../topbar/topbar.component';
import { SidebarService } from '../aside-super-admin-menu/sidebar.service';

@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [CommonModule, AsideSuperAdminMenu, TopbarComponent],
  templateUrl: './shell-layout.component.html',
  styleUrl: './shell-layout.component.scss',
})
export class ShellLayoutComponent {
  /** Botón de acción del topbar — si no se pasa, no aparece */
  @Input() action: TopbarAction | null = null;
  @Output() actionClick = new EventEmitter<void>();

  protected sidebarSvc = inject(SidebarService);
}