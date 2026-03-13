import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsideSuperAdminMenu } from '../../../layout/aside-super-admin-menu/aside-super-admin-menu';
import { TopbarComponent } from '../components/topbar/topbar.component';
import { StatCardComponent } from '../components/stat-card/stat-card.component';
import { FiltersBarComponent, FiltersState } from '../components/filters-bar/filters-bar.component';
import { EstanciasTableComponent, Estancia } from '../components/table-component/estancias-table.component';
import { EstanciaViewModalComponent } from '../components/estancia-view-modal/estancia-view-modal';
import { SidebarService } from '../../../layout/aside-super-admin-menu/sidebar.service';
import { EstanciaService } from '../service/estancia.service';



import { FormRegistroComponent, EstanciaPayload } from '../components/formRegistro/formRegistro.component';


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
    EstanciaViewModalComponent,
    FormRegistroComponent,
  ],
  templateUrl: './estancias-page.component.html',
  styleUrl: './estancias-page.component.scss',
})
export class EstanciasPageComponent implements OnInit {

  constructor(
    public sidebarSvc: SidebarService,
    private estanciaSvc: EstanciaService
  ) { }

  ngOnInit(): void {
    this.cargarEstancias();
  }

  // ── Stats ──
  stats = [
    { icon: 'domain', value: 0, label: 'Total Estancias', color: 'blue' as const },
    { icon: 'check_circle', value: 0, label: 'Activas', color: 'green' as const },
    { icon: 'settings', value: 0, label: 'En Configuración', color: 'amber' as const },
    { icon: 'block', value: 0, label: 'Inactivas', color: 'red' as const },
  ];

  // ── Tabla ──
  estancias: Estancia[] = [
    {
      id: '1',
      nombre: 'Estancia Alzheimer Dorita de Ojeda',
      ciudad: 'Hermosillo',
      estado: 'Sonora',
      pais: 'México',
      colonia: 'Col. Centro',
      horario: 'Lun–Vie 08:00–17:00',
      capacidadActual: 18,
      capacidadMax: 25,
      administrador: 'Rosa López',
      estatus: true,
      fechaAlta: '2023-03-15',
    },
    {
      id: '2',
      nombre: 'Estancia San José del Bosque',
      ciudad: 'Guadalajara',
      estado: 'Jalisco',
      pais: 'México',
      colonia: 'Col. Providencia',
      horario: 'Lun–Sáb 07:00–18:00',
      capacidadActual: 5,
      capacidadMax: 20,
      administrador: null,
      estatus: false,
      fechaAlta: '2024-11-02',
    },
  ];
  cargando = false;
  errorCarga = false;
  totalEstancias = 2;
  currentPage = 1;
  totalPages = 1;

  // ── Modal crear ──
  mostrarModal = false;

  // ── Modal ver ──
  selectedEstancia: Estancia | null = null;
  showViewModal = false;

  // ── GET /api/centers ──
  cargarEstancias(): void {
    this.cargando = true;
    this.errorCarga = false;

    this.estanciaSvc.getCentros().subscribe({
      next: (data) => {
        this.estancias = data;
        this.totalEstancias = data.length;

        this.stats[0].value = data.length;
        this.stats[1].value = data.filter((e: Estancia) => e.estatus === true).length;
        this.stats[2].value = data.filter((e: Estancia) => e.estatus === false).length;
        this.stats[3].value = 0; // reservado si el backend añade un tercer estado
        this.totalPages = Math.ceil(data.length / 10) || 1;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar estancias:', err);
        this.errorCarga = true;
        this.cargando = false;
      }
    });
  }

  // ── Handlers modal crear ──
  onNewEstancia(): void {
    this.mostrarModal = true;
  }

  onModalCancelado(): void {
    this.mostrarModal = false;
  }

  onEstanciaCreada(datos: EstanciaPayload): void {
    this.mostrarModal = false;
    this.cargarEstancias();
  }

  // ── Handlers modal ver ──
  onView(estancia: Estancia): void {
    this.selectedEstancia = estancia;
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedEstancia = null;
  }

  // ── Handlers tabla ──
  onFiltersChange(filters: FiltersState): void {
    console.log('Filtros:', filters);
    // TODO: pasar filtros al servicio
  }

  onEdit(estancia: Estancia): void { console.log('Editar:', estancia); }
  onDelete(estancia: Estancia): void { console.log('Eliminar:', estancia); }
  onPageChange(page: number): void { this.currentPage = page; }
}