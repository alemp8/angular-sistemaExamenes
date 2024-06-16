import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { CommonFormComponent } from '../common-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent extends CommonFormComponent<Alumno, AlumnoService> {
  private fotoseleccionada: File | undefined;

  constructor(service: AlumnoService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
    this.model = new Alumno();
    this.redirect = '/alumnos';
    this.fotoseleccionada = undefined;
  }

  public selectFoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fotoseleccionada = input.files[0];
      console.log(this.fotoseleccionada);
    }
  }

  public override crear(): void {
    if(!this.fotoseleccionada){
      super.crear();
    } else {
      this.service.crearConFoto(this.model, this.fotoseleccionada)
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
  }

  public override editar(): void {
    if(!this.fotoseleccionada){
      super.editar();
    } else {
      this.service.EditarFoto(this.model, this.fotoseleccionada)
      .pipe(
        tap(m => {
          console.log(m);
          Swal.fire('Nuevo:',`SE ${m.nombre} ACTUALIZO CORRECTAMENTE`, 'success');
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
  }
}



