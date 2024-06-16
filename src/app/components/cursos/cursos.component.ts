import { Component } from '@angular/core';
import { CommonListarComponente } from '../common.listar.component';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent extends CommonListarComponente<Curso, CursoService> {
constructor(service: CursoService){
  super(service);
  this.titulo = "Listado de Cursos";
}


}
