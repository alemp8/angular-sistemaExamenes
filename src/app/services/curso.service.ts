import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
import { Curso } from '../models/curso';
import { Alumno } from '../models/alumno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends CommonService<Curso>{
  constructor(http: HttpClient) {
    super(http);
    this.baseEndpoint = 'http://localhost:8090/api/cursos';
  } 

  asignarAlumnos(curso:Curso, alumnos: Alumno[]):Observable<Curso>{
    return this.http.put<Curso>('${this.baseEndpoint}/${curso.id}/asignar-alumnos', alumnos, 
    {headers: this.cabeceras});
  }
}
