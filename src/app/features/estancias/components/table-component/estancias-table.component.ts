import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Estancia {
  id: string;
  nombre: string;
  ciudad: string;
  estado: string;
  pais: string;
  colonia: string;
  horario: string;
  capacidadActual: number;
  capacidadMax: number;
  administrador: string | null;
  estatus: boolean; // realizar que dependiendo si es en configuracion o inactiva es false 
  fechaAlta: string;
}

@Component({
  selector: 'app-estancias-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estancias-table.component.html',
  styleUrl: './estancias-table.component.scss',
})
export class EstanciasTableComponent implements OnChanges {
  @Input() estancias: Estancia[] = [];
  @Input() totalEstancias: number = 0;
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  @Output() viewEstancia = new EventEmitter<Estancia>();
  @Output() editEstancia = new EventEmitter<Estancia>();
  @Output() deleteEstancia = new EventEmitter<Estancia>();
  @Output() pageChange = new EventEmitter<number>();

  pages: number[] = [];

  ngOnChanges() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onView(row: Estancia) { this.viewEstancia.emit(row); }
  onEdit(row: Estancia) { this.editEstancia.emit(row); }
  onDelete(row: Estancia) { this.deleteEstancia.emit(row); }
  onPageChange(p: number) { this.pageChange.emit(p); }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(w => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  getCapacityPercent(actual: number, max: number): number {
    if (max === 0) return 0;
    return Math.round((actual / max) * 100);
  }

  getCapacityClass(actual: number, max: number): string {
    const pct = this.getCapacityPercent(actual, max);
    if (pct >= 100) return 'full';
    if (pct >= 70) return 'warn';
    return '';
  }

  getBadgeClass(estatus: boolean): string {
    if (estatus) return 'badge-active';
    return 'badge-config'; // false = En configuración / Inactiva
  }
}
