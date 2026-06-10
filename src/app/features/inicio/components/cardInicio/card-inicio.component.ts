import {ResumenInicio} from "../../model/inicio.model";

import { Component, Input } from "@angular/core";

@Component({
  selector: "app-tarjeta-resumen",
  standalone: true,
  templateUrl: "./card-inicio.component.html",
  styleUrl: "./card-inicio.component.css",
})
export class TarjetaResumenComponent {
  @Input({ required: true }) titulo!: string;
  @Input({ required: true }) cantidad!: number;
  @Input() color: string = "#2f6bff"; // azul por defecto
}