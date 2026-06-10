//Modelos interface de inicio 
// datos que se ocupan se hara interface obtenidas de la api

export interface ResumenEstancia {
    nombreEstancia: string;
    pacientes: number | string;
    nombreAdmin: string;
    estadoEstancia: boolean;

}

export interface ActividadReciente {
    // hora del dia de hoy si hubo actividad reciente si no se mostrara el dia o un msj de ayer 
    id: string;
    fecha: string;
    descripcion: string;
}


//solo un fetch y las tarjetas KPI leen de aqui
export interface ResumenInicio {
    estanciasActivas: number;
    pacientesTotales: number;
    administradores: number;
    alertas: number;

}