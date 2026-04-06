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
  @Output() edit = new EventEmitter<Estancia>();

  closeModal(): void {
    this.close.emit();
  }

  onEdit(): void {
    if (this.estancia) {
      this.edit.emit(this.estancia);
    }
  }
}