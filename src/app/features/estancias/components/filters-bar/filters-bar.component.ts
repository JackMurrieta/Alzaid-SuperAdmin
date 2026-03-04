import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FiltersState {
  search: string;
  status: string;
  country: string;
  state: string;
}

@Component({
  selector: 'app-filters-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters-bar.component.html',
  styleUrl: './filters-bar.component.scss',
})
export class FiltersBarComponent {
  @Input() searchValue: string = '';
  @Input() selectedStatus: string = '';
  @Input() selectedCountry: string = '';
  @Input() selectedState: string = '';

  @Output() filtersChange = new EventEmitter<FiltersState>();

  onSearch(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value;
    this.emit();
  }

  onStatusChange(event: Event) {
    this.selectedStatus = (event.target as HTMLSelectElement).value;
    this.emit();
  }

  onCountryChange(event: Event) {
    this.selectedCountry = (event.target as HTMLSelectElement).value;
    this.emit();
  }

  onStateChange(event: Event) {
    this.selectedState = (event.target as HTMLSelectElement).value;
    this.emit();
  }

  private emit() {
    this.filtersChange.emit({
      search:  this.searchValue,
      status:  this.selectedStatus,
      country: this.selectedCountry,
      state:   this.selectedState,
    });
  }
}
