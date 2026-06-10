import { Component, Input } from '@angular/core';
import { ActividadReciente } from '../../model/inicio.model'; // ajusta la ruta

// Vista interna: la actividad + su etiqueta de fecha ya formateada
interface ActividadVM extends ActividadReciente {
  etiquetaFecha: string;
}

@Component({
  selector: 'app-actividad-reciente',
  standalone: true,
  templateUrl: './actividad-reciente.component.html',
  styleUrl: './actividad-reciente.component.scss',
})
export class ActividadRecienteComponent {
  vmActividades: ActividadVM[] = [];

  // El padre le pasa las actividades (luego vendrán de la API)
  @Input() set actividades(valor: ActividadReciente[]) {
    this.vmActividades = [...valor]
      // pila: la más reciente primero
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      // precalcula la etiqueta una sola vez, no en cada render
      .map((act) => ({ ...act, etiquetaFecha: formatearActividad(act.fecha) }));
  }
}

// --- función que ya pegaste ---
export function formatearActividad(fecha: string): string {
  const act = new Date(fecha);
  const hoy = new Date();

  const ayer = new Date(hoy);
  ayer.setDate(hoy.getDate() - 1);

  const mismoDia = (a: Date, b: Date) => a.toDateString() === b.toDateString();

  if (mismoDia(act, hoy)) {
    return act.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  }
  if (mismoDia(act, ayer)) return 'Ayer';

  return act.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
}