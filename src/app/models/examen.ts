import { Asignatura } from "./asignatura";
import { Generic } from "./generic";
import { Pregunta } from "./pregunta";
import { Respuesta } from "./respuesta";

export class Examen implements Generic{
    id:number;
    nombre:string;
    fecha:string;
    preguntas: Pregunta[] = [];
    asignatura: Asignatura;
    respondido: boolean;

    constructor() {
        this.id = 0; // Puedes asignar cualquier valor predeterminado
        this.nombre = '';
        this.fecha = '';
        this.preguntas= [];
        this.asignatura= new Asignatura;
        this.respondido= false;
    }
}
