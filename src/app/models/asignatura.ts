export class Asignatura {
    id:number;
    nombre:string;
    padre:Asignatura;
    hijos:Asignatura[];

    constructor(){
        this.id = 0;
        this.nombre='';
        this.padre = new Asignatura;
        this.hijos = [];
    }
}
