import { Generic } from "./generic";

export class Alumno implements Generic {
    id: number;
    nombre: string;
    apellido: string;
    email:string;
    fecha:string;
    fotoHaschCode: number;

    constructor() {
        this.id = 0; // Puedes asignar cualquier valor predeterminado
        this.nombre = '';
        this.apellido = '';
        this.email = '';
        this.fecha = '';
        this.fotoHaschCode = 0;
    }
}
