import { Component, inject } from '@angular/core';
import { AsideSuperAdminMenu } from '../aside-super-admin-menu/aside-super-admin-menu';
import { SidebarService } from '../aside-super-admin-menu/sidebar.service';

@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [AsideSuperAdminMenu],
  templateUrl: './shell-layout.component.html',
  styleUrl: './shell-layout.component.scss',
})
export class ShellLayoutComponent {
  protected sidebarSvc = inject(SidebarService);
}