import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type StatCardColor = 'blue' | 'green' | 'amber' | 'red';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class StatCardComponent {
  /** Icono de Google Material Symbols, ej: 'home', 'check_circle', 'settings', 'block' */
  @Input() icon: string = 'home';

  /** Número o texto grande a mostrar */
  @Input() value: number | string = 0;

  /** Etiqueta debajo del número */
  @Input() label: string = '';

  /** Color del fondo del icono: 'blue' | 'green' | 'amber' | 'red' */
  @Input() color: StatCardColor = 'blue';

  get colorClass(): string {
    return this.color;
  }
}

/*
  ── USO EN EL PADRE ──────────────────────────────────────────────────
  <div class="stats-strip">
    <app-stat-card icon="domain"        [value]="12" label="Total Estancias"     color="blue"  />
    <app-stat-card icon="check_circle"  [value]="9"  label="Activas"             color="green" />
    <app-stat-card icon="settings"      [value]="2"  label="En Configuración"    color="amber" />
    <app-stat-card icon="block"         [value]="1"  label="Inactivas"           color="red"   />
  </div>

  ── ICONOS SUGERIDOS (Google Material Symbols) ───────────────────────
  Total Estancias  → 'domain'  /  'corporate_fare'  /  'apartment'
  Activas          → 'check_circle'  /  'verified'
  En Configuración → 'settings'  /  'tune'
  Inactivas        → 'block'  /  'cancel'
  ─────────────────────────────────────────────────────────────────────
*/
