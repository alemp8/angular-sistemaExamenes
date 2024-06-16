import { Component, Directive, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2';
import { Generic } from '../models/generic';
import { CommonService } from '../services/common.service';

@Directive()
export abstract class CommonListarComponente<E extends Generic, S extends CommonService<E> >implements OnInit {
  titulo:string;
  lista: E[]=[];

  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 5 ;

  //Inyectamos el AlumnoService
  constructor(protected service: S){
  this.titulo = "";
  }
//Inicializamos para obtener al suscribirnos los datos de los alumnos
  ngOnInit(): void {
    this.CalcularRango();
  }

  paginar(event: PageEvent): void{
this.paginaActual = event.pageIndex;
this.totalPorPagina = event.pageSize;
this.CalcularRango();
  }

  private CalcularRango(){
    this.service.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString()).subscribe(p => 
      {
this.lista = p.content as E[];
//Asignamos el valor a total registros
this.totalRegistros = p.totalElements as number;
    });
  }

  public eliminar(e: E): void{
    Swal.fire({
      title: "CUIDADO?",
      text: "Seguro que quieres eliminar a ${e.nombre} ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminalo"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(e.id).subscribe(() =>{
          this.CalcularRango();
          Swal.fire('ELIMINADO','Se elimino con exito','success');
        })
      }
    });



  }
}
