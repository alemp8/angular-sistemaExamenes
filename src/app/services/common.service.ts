import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Alumno } from '../models/alumno';
import { Generic } from '../models/generic';

@Injectable()
//utilizamos abstract class solo para poder heredar
export abstract class CommonService<E extends Generic> {

  protected baseEndpoint: string;
  protected cabeceras: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(protected http:HttpClient) {
    this.baseEndpoint = ''; 
  }

   //Incluimos los metodos
   public listar(): Observable<E[]>{
    return this.http.get<E[]>(this.baseEndpoint);
  }
/*Para la paginacion: Page y size representan el numero de paginas y el tamaño, el any
significa que el componente que consume este servicio puede suscribirse a la respuesta asincrónica 
y manejarla según sea necesario.
*/
public listarPaginas(page: string, size: string): Observable<any> {
  const params = new HttpParams()
    .set('page', page)
    .set('size', size);
  return this.http.get<any>(`${this.baseEndpoint}/pagina`, { params: params });
}
  public ver(id:number): Observable<E>{
   return this.http.get<E>(this.baseEndpoint+'/'+id);
  }

  public crear(e:E): Observable<E>{
    return this.http.post<E>(this.baseEndpoint,e,{headers:this.cabeceras});
  }
//Para editar necesitamos el endpoint, el id del alumno para saber que vamos a modificar 
  public editar(e:E): Observable<E>{
    return this.http.put<E>(this.baseEndpoint+'/'+e.id, e,{headers:this.cabeceras});
  }
  //Solo necesitaremos pasar el id para eliminar y el observable lo declaramos de tipo void porque no nos devuelve un valor
  public eliminar(id:number): Observable<void>{
    return this.http.delete<void>(this.baseEndpoint+'/'+id);
  }
}
