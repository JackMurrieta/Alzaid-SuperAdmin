import { Component } from "@angular/core";
import { CardInicio } from "../components/cardInicio/card-inicio.component";
import { ResumenEstanciasComponent } from "../components/resumen-estancias/resumen-estancias.component";
import { ResumenInicio, ResumenEstancia } from "../model/inicio.model";
import { ActividadRecienteComponent } from "../components/actividad-reciente/actividad-reciente.component"
import { ShellLayoutComponent } from '../../../layout/shell-layout.component/shell-layout.component';
import { TopbarComponent } from '../../../layout//topbar/topbar.component';


@Component({
  selector: "app-inicio-page",
  standalone: true,
  imports: [CardInicio, ResumenEstanciasComponent, ActividadRecienteComponent, ShellLayoutComponent, TopbarComponent],
  templateUrl: "./inicio-page.component.html",
  styleUrl: "./inicio-page.component.scss",
})
export class InicioPageComponent {
  resumen: ResumenInicio = {
    estanciasActivas: 12,
    pacientesTotales: 248,
    administradores: 15,
    alertas: 3,
  };

  estancias: ResumenEstancia[] = [
    { nombreEstancia: "Vida Plena", pacientes: 32, nombreAdmin: "Ana López", estadoEstancia: true },
    { nombreEstancia: "Nuevo Amanecer", pacientes: 27, nombreAdmin: "Carlos Ruiz", estadoEstancia: true },
    { nombreEstancia: "Santa María", pacientes: 18, nombreAdmin: "Sin asignar", estadoEstancia: false },
  ];
}