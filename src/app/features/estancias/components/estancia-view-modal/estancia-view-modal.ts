import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Estancia } from '../table-component/estancias-table.component';

@Component({
  selector: 'app-estancia-view-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estancia-view-modal.html',
  styleUrl: './estancia-view-modal.scss'
})
export class EstanciaViewModalComponent {

  @Input() estancia: Estancia | null = null;

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  getInitials(name: string | null | undefined): string {
    if (!name) return '';

    return name
      .split(' ')
      .map(w => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }


}