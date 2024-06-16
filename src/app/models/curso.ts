import { Alumno } from "./alumno";
import { Examen } from "./examen";
import { Generic } from "./generic";

export class Curso implements Generic {
    id:number;
    nombre:string;
    fecha:string;
    alumnos: Alumno[] = [];
    examenes: Examen[] = [];

    constructor() {
        this.id = 0; // Puedes asignar cualquier valor predeterminado
        this.nombre = '';
        this.fecha = '';
        this.alumnos= [];
        this.examenes = [];
    }
}
