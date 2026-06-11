import {ResumenInicio} from "../../model/inicio.model";

import { Component, Input } from "@angular/core";

@Component({
  selector: "app-card-inicio",
  standalone: true,
  templateUrl: "./card-inicio.component.html",
  styleUrl: "./card-inicio.component.scss",
})
export class CardInicio {
  @Input({ required: true }) titulo!: string;
  @Input({ required: true }) cantidad!: number;
  @Input() color: string = "#2f6bff"; // azul por defecto
}