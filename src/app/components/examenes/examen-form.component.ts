import { Component } from '@angular/core';
import { CommonFormComponent } from '../common-form.component';
import { Examen } from 'src/app/models/examen';
import { ExamenService } from 'src/app/services/examen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from 'src/app/models/asignatura';
import { Pregunta } from 'src/app/models/pregunta';

@Component({
  selector: 'app-examen-form',
  templateUrl: './examen-form.component.html',
  styleUrls: ['./examen-form.component.css']
})
export class ExamenFormComponent extends CommonFormComponent<Examen, ExamenService>{

  asignaturas: Asignatura[] = [];
  constructor(service: ExamenService, router: Router, route: ActivatedRoute){
    super(service,router,route);
    this.redirect = '/examenes';
  }

  override ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get;
      if (id) {
        this.service.ver(id).subscribe(m => {
          this.model = m;
        });
      }
    });

    this.service.findallAsignatura().subscribe(asignaturas=>this.asignaturas = asignaturas);
  }

  agregarPregunta(): void {
    this.model.preguntas.push(new Pregunta());
  }
  asignaturaTexto(pregunta: Pregunta, event: any): void{
    pregunta.texto=event.target.value;
    console.log(this.model);
  }
 
  eliminarpregunta(pregunta: Pregunta):void{
this.model.preguntas = this.model.preguntas.filter(p=>pregunta.texto !== p.texto)
  }

  eliminarpreguntasVacias():void{
    this.model.preguntas = this.model.preguntas.filter(p=>p.texto !=null && p.texto.length>0)
  }

  public override crear(): void {
    this.eliminarpreguntasVacias();
    super.crear();
  }
  
   public override editar(): void {
    this.eliminarpreguntasVacias();
    super.editar();
  }
}
