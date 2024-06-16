import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursoService } from 'src/app/services/curso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-alumnos',
  templateUrl: './asignar-alumnos.component.html',
  styleUrls: ['./asignar-alumnos.component.css']
})
export class AsignarAlumnosComponent {
curso: Curso;
alumnosAsignar: Alumno[];
displayedColumns: string[] = ['nombre', 'apellido', 'seleccion'];

seleccion: SelectionModel<Alumno> = new SelectionModel<Alumno>(true,[]);

constructor(private route:ActivatedRoute, private cursoService: CursoService, private alumnoService: AlumnoService ){
 this.curso = new Curso();
 this.alumnosAsignar = [];
}

ngOnInit(){
  this.route.paramMap.subscribe(params => {
const id: number=+params.get('id')!;
this.cursoService.ver(id).subscribe(c=>this.curso = c);
  });
}

filtrar(nombre:string):void{
  nombre = nombre !== undefined? nombre.trim():'';
  if(nombre !==""){
    this.alumnoService.filtrarPorNombre(nombre).subscribe(alumnos => this.alumnosAsignar = alumnos.filter(a=>{
      let filtro = true;
      this.curso.alumnos.forEach(ca=>{
        if(a.id === ca.id){
          filtro=false;
        }
      });
      return filtro;
  }));
  }
}

seleccionarDesSeleccionarTodos(): void{
this.estanTodosSeleccionados()?
this.seleccion.clear():
this.alumnosAsignar.forEach(a=> this.seleccion.select(a));
}

estanTodosSeleccionados(): boolean{
const seleccionados = this.seleccion.selected.length;
const numAlumnos = this.alumnosAsignar.length;
return (seleccionados === numAlumnos)
}

asignar():void{
  this.cursoService.asignarAlumnos(this.curso, this.seleccion.selected).subscribe(c=>{
    Swal.fire(
      'Asignados:','Alumnos asignados con exito',
      'success'
    );
    this.alumnosAsignar = [];
    this.seleccion.clear();
  });
}
}
