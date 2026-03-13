import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsideSuperAdminMenu } from '../../../layout/aside-super-admin-menu/aside-super-admin-menu';
import { TopbarComponent } from '../components/topbar/topbar.component';
import { StatCardComponent } from '../components/stat-card/stat-card.component';
import { FiltersBarComponent, FiltersState } from '../components/filters-bar/filters-bar.component';
import { EstanciasTableComponent, Estancia } from '../components/table-component/estancias-table.component';
import { SidebarService } from '../../../layout/aside-super-admin-menu/sidebar.service';
import { FormRegistroComponent } from '../components/formRegistro/formRegistro.component';
import { EstanciaService } from '../service/estancia.service';

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
    FormRegistroComponent
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

  // ── Stats
  stats = [
    { icon: 'domain', value: 0, label: 'Total Estancias', color: 'blue' as const },
    { icon: 'check_circle', value: 0, label: 'Activas', color: 'green' as const },
    { icon: 'settings', value: 0, label: 'En Configuración', color: 'amber' as const },
    { icon: 'block', value: 0, label: 'Inactivas', color: 'red' as const },
  ];

  // ── Tabla ──
  estancias: Estancia[] = [];
  cargando = false;
  errorCarga = false;
  totalEstancias = 0;
  currentPage = 1;
  totalPages = 1;

  // ── Modal ──
  mostrarModal = false;

  // ── GET /api/centers ──
  cargarEstancias(): void {
    this.cargando = true;
    this.errorCarga = false;

    this.estanciaSvc.getCentros().subscribe({
      next: (data) => {
        this.estancias = data;
        this.totalEstancias = data.length;

        // Actualizar stats con datos reales
        this.stats[0].value = data.length;
        this.stats[1].value = data.filter((e: any) => e.isActive === true).length;
        this.stats[2].value = data.filter((e: any) => e.isActive === false).length;
        this.stats[3].value = 0; // ajustar si el backend maneja un estado "inactivo" distinto

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

  // ── Handlers ──
  onNewEstancia(): void {
    this.mostrarModal = true;
  }

  onModalCancelado(): void {
    this.mostrarModal = false;
  }

  onFiltersChange(filters: FiltersState): void {
    console.log('Filtros:', filters);
    // TODO: pasar filtros al servicio
  }

  onEstanciaCreada(datos: any): void {
    this.mostrarModal = false;
    this.cargarEstancias(); // refresca tabla con el nuevo registro
  }

  onView(estancia: Estancia): void { console.log('Ver:', estancia); }
  onEdit(estancia: Estancia): void { console.log('Editar:', estancia); }
  onDelete(estancia: Estancia): void { console.log('Eliminar:', estancia); }
  onPageChange(page: number): void { this.currentPage = page; }
}