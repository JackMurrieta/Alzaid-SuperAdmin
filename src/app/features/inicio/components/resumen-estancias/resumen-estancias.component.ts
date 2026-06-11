import { Component, Input } from "@angular/core";
import { ResumenEstancia } from "../../model/inicio.model";

@Component({
    selector: "app-tabla-estancias",
    standalone: true,
    templateUrl: "./resumen-estancias.component.html",
    styleUrl: "./resumen-estancias.component.scss",
})
export class ResumenEstanciasComponent {
    @Input({ required: true }) estancias: ResumenEstancia[] = [];
}