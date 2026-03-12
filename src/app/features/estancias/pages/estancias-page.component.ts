import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importas cada componente hijo directamente
import { AsideSuperAdminMenu } from '../../../layout/aside-super-admin-menu/aside-super-admin-menu';
import { TopbarComponent } from '../components/topbar/topbar.component';
import { StatCardComponent } from '../components/stat-card/stat-card.component';
import { FiltersBarComponent, FiltersState } from '../components/filters-bar/filters-bar.component';
import { EstanciasTableComponent, Estancia } from '../components/table-component/estancias-table.component';
import { EstanciaViewModalComponent } from '../components/estancia-view-modal/estancia-view-modal';


import { SidebarService } from '../../../layout/aside-super-admin-menu/sidebar.service';

@Component({
  selector: 'app-estancias-page',
  standalone: true,
  imports: [
    CommonModule,
    AsideSuperAdminMenu,
    TopbarComponent,
    StatCardComponent,
    FiltersBarComponent,
    EstanciasTableComponent,
    EstanciaViewModalComponent
  ],
  templateUrl: './estancias-page.component.html',
  styleUrl: './estancias-page.component.scss',
})
export class EstanciasPageComponent {

  constructor(public sidebarSvc: SidebarService) { }

  // ── Datos de stats ──
  stats = [
    { icon: 'domain', value: 12, label: 'Total Estancias', color: 'blue' as const },
    { icon: 'check_circle', value: 9, label: 'Activas', color: 'green' as const },
    { icon: 'settings', value: 2, label: 'En Configuración', color: 'amber' as const },
    { icon: 'block', value: 1, label: 'Inactivas', color: 'red' as const },
  ];

  // ── Datos de tabla ──
  estancias: Estancia[] = [
    {
      id: 'EST-0001', nombre: 'Estancia del Sol',
      ciudad: 'Ciudad Obregón', estado: 'Sonora', pais: 'México', colonia: 'Col. Centro',
      horario: '8:00 – 17:00', capacidadActual: 18, capacidadMax: 25,
      administrador: 'Rosa López', estatus: 'Activa', fechaAlta: '12/01/2024',
    },
    {
      id: 'EST-0002', nombre: 'Casa de la Esperanza',
      ciudad: 'Hermosillo', estado: 'Sonora', pais: 'México', colonia: 'Col. Pitic',
      horario: '7:30 – 16:00', capacidadActual: 30, capacidadMax: 30,
      administrador: 'Mario García', estatus: 'Activa', fechaAlta: '03/03/2024',
    },
    // ...más filas
  ];

  totalEstancias = 12;
  currentPage = 1;
  totalPages = 3;

  // ── Handlers ──
  onNewEstancia() {
    console.log('Abrir modal crear');
  }

  //Estado del modal
  selectedEstancia: Estancia | null = null;
  showViewModal = false;

  onFiltersChange(filters: FiltersState) {
    console.log('Filtros:', filters);
    // Aquí llamas tu servicio con los filtros
  }

  onView(estancia: Estancia) {
    this.selectedEstancia = estancia;
    this.showViewModal = true;
  }
  onEdit(estancia: Estancia) { console.log('Editar:', estancia); }
  onDelete(estancia: Estancia) { console.log('Eliminar:', estancia); }
  onPageChange(page: number) { this.currentPage = page; }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedEstancia = null;
  }
}