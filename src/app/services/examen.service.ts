import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
import { Examen } from '../models/examen';
import { Observable } from 'rxjs';
import { Asignatura } from '../models/asignatura';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends CommonService<Examen> {
  constructor(http: HttpClient) {
    super(http);
    this.baseEndpoint = 'http://localhost:8090/api/examenes';
  } 

  public findallAsignatura(): Observable<Asignatura[]>{
     return this.http.get<Asignatura[]>('${this.baseEndpoint}/asignaturas');
  }
}
