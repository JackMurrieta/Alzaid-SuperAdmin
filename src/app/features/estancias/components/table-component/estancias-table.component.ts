import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modelo que refleja exactamente el JSON del backend
export interface Estancia {
  _id: string;
  name: string;
  description: string;
  address: string;
  email: string;
  phone: string;
  country: string;
  isActive: boolean;
  // createdAt y updatedAt se omiten porque no son relevantes para el front
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

  getBadgeClass(isActive: boolean): string {
    return isActive ? 'badge-active' : 'badge-inactive';
  }
}