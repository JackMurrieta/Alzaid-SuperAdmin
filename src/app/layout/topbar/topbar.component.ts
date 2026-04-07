import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface TopbarAction {
  label: string;
  icon?: string;
}

// Mapa completo de segmentos → etiqueta legible
// Basado en las rutas del aside y app.routes.ts
const ROUTE_LABELS: Record<string, string> = {
  // Raíz
  'super': 'Inicio',

  // Estancias
  'estancias': 'Estancias',
  'operar': 'Operar Estancia',
  'inactivas': 'Estancias Inactivas',

  // Usuarios y administradores
  'usuarios': 'Usuarios',
  'administradores': 'Administradores',

  // Reportes
  'metricas': 'Métricas Globales',
  'auditoria': 'Auditoría Global',

  // Configuración
  'configuracion': 'Configuración',
  'config': 'Configuración',

  // Dashboard
  'dashboard': 'Dashboard',
};

// Segmentos que se omiten del breadcrumb (prefijos de layout, no secciones)
const SKIP_SEGMENTS = new Set(['super']);

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent implements OnInit {

  @Input() action: TopbarAction | null = null;
  @Output() actionClick = new EventEmitter<void>();

  breadcrumbs: BreadcrumbItem[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.buildBreadcrumbs(this.router.url);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => this.buildBreadcrumbs(e.urlAfterRedirects));
  }

  private buildBreadcrumbs(url: string): void {
    // Quitar query params y fragmentos
    const cleanUrl = url.split('?')[0].split('#')[0];
    const segments = cleanUrl.split('/').filter(Boolean);

    const crumbs: BreadcrumbItem[] = [
      { label: 'Inicio', path: '/super/dashboard' },
    ];

    let builtPath = '';
    segments.forEach((seg, i) => {
      builtPath += `/${seg}`;

      if (SKIP_SEGMENTS.has(seg)) return; // omitir 'super' del breadcrumb

      const isLast = i === segments.length - 1;
      crumbs.push({
        label: ROUTE_LABELS[seg] ?? this.capitalize(seg),
        path: isLast ? undefined : builtPath,
      });
    });

    this.breadcrumbs = crumbs;
  }

  private capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  onAction(): void {
    this.actionClick.emit();
  }
}