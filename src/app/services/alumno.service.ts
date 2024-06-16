import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Alumno } from '../models/alumno';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends CommonService<Alumno> {
  constructor(http: HttpClient) {
    super(http);
    this.baseEndpoint = 'http://localhost:8090/api/alumnos';
  } 

  public crearConFoto(alumno:Alumno, archivo: File): Observable<Alumno>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', alumno.nombre);
    formData.append('apellido', alumno.apellido);
    formData.append('email', alumno.email);
    return this.http.post<Alumno>(this.baseEndpoint+'/crear-con-foto',FormData)
  }

  public EditarFoto(alumno:Alumno, archivo: File): Observable<Alumno>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', alumno.nombre);
    formData.append('apellido', alumno.apellido);
    formData.append('email', alumno.email);
    return this.http.put<Alumno>('${this.baseEndpoint}/editar-con-foto/${alumno.id}',FormData)
  }

  public filtrarPorNombre(nombre:string): Observable<Alumno[]>{
    return this.http.get<Alumno[]>('${this.baseEndpoint}/filtrar/${nombre}');
  }
}
