import { Component, Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { CommonService } from '../services/common.service';
import { Generic } from '../models/generic';

@Directive()
export class CommonFormComponent<E extends Generic, S extends CommonService<E>>{

model: E;
error: any;
protected redirect : string;

constructor(protected service: S, protected router:Router, protected route: ActivatedRoute){

  this.model = {} as E; 
  this.redirect = "";
}
ngOnInit(){
  this.route.paramMap.subscribe(params => {
    const id: number = +params.get;
    if (id) {
      this.service.ver(id).subscribe(m => {
        this.model = m;
      });
    }
  });
}



public crear(): void {
  this.service.crear(this.model)
    .pipe(
      tap(m => {
        console.log(m);
        Swal.fire('Nuevo:',`SE ${m.nombre} CREO CON EXITO`, 'success');
        this.router.navigate(['/alumnos']);
      }),
      catchError(err => {
        if (err.status === 400) {
          this.error = err.error;
          console.log(this.error);
        }
        return throwError(() => err);
      })
    )
    .subscribe();
}

public editar(): void {
  this.service.crear(this.model)
    .pipe(
      tap(m => {
        console.log(m);
        Swal.fire('MODIFICACION:',`ALUMNO ${m.nombre} ACTUALIZADO CON EXITO`,'success');
        this.router.navigate([this.redirect]);
      }),
      catchError(err => {
        if (err.status === 400) {
          this.error = err.error;
          console.log(this.error);
        }
        return throwError(() => err);
      })
    )
    .subscribe();
}


}
