import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2';
import { CommonListarComponente } from '../common.listar.component';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent extends CommonListarComponente<Alumno, AlumnoService> implements OnInit {

  constructor(service: AlumnoService){
    super(service);
    this.titulo = 'Listado de Alumnos';
  }
  
  



 
}
