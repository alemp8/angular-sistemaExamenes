import { Component } from '@angular/core';
import { CommonFormComponent } from '../common-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css']
})
export class CursoFormComponent extends CommonFormComponent<Curso, CursoService>{

  constructor(service: CursoService, router:Router, route: ActivatedRoute){
    super(service, router, route);
    this.model = new Curso();
    this.redirect = '/cursos';
  }
}
