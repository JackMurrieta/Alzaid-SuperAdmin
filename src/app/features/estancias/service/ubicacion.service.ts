
import { Injectable } from '@angular/core';
import { ESTADOS_MEXICO, MUNICIPIOS_MEXICO } from './ubicacion.data';

@Injectable({ providedIn: 'root' })
export class UbicacionService {

  getEstados(): string[] {
    return ESTADOS_MEXICO;
  }

  getMunicipios(estado: string): string[] {
    return MUNICIPIOS_MEXICO[estado] ?? [];
  }

  validarCP(cp: string): boolean {
    return /^\d{5}$/.test(cp);
  }
}