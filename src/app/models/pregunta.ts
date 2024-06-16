import { Examen } from "./examen";

export class Pregunta {
    id:number;
    texto:string;
    examen:Examen;

    constructor(){
        this.id = 0;
        this.texto='';
        this.examen = new Examen;
    }
}
