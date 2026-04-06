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

  // ── Estado de carga ──
  cargando = false;
  errorCarga = false;

  // ── Datos ──
  estancias: Estancia[] = [];
  totalEstancias = 0;
  currentPage = 1;
  totalPages = 1;

  // ── Stats ──
  stats = [
    { icon: 'domain', value: 0, label: 'Total Estancias', color: 'blue' as const },
    { icon: 'check_circle', value: 0, label: 'Activas', color: 'green' as const },
    { icon: 'block', value: 0, label: 'Inactivas', color: 'red' as const },
  ];

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
      next: (data: Estancia[]) => {
        this.estancias = data;
        this.totalEstancias = data.length;
        this.totalPages = Math.ceil(data.length / 10) || 1;

        // Stats usando isActive (campo real del backend)
        this.stats[0].value = data.length;
        this.stats[1].value = data.filter(e => e.isActive).length;
        this.stats[2].value = data.filter(e => !e.isActive).length;

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

  onEstanciaCreada(_datos: EstanciaPayload): void {
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
  onFiltersChange(_filters: FiltersState): void {
    // TODO: pasar filtros al servicio
  }

  onEdit(estancia: Estancia): void {
    // TODO: abrir modal de edición
    console.log('Editar:', estancia);
  }

  onDelete(estancia: Estancia): void {
    // TODO: confirmar y llamar servicio
    console.log('Eliminar:', estancia);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}