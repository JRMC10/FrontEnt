import { Injectable } from '@angular/core';
import { Directive } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TarjetaCredito } from '../Models/TarjetaCredito';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  /*se declaran las variables como  */
myAppUrl= 'https://localhost:44304/';
myApApi = 'api/TarjetaCredito/';
list: TarjetaCredito[];
private actualizarFormulario = new BehaviorSubject<TarjetaCredito>({} as any);

/*se llama al HttpClient para conectar con el BackEnd */
  constructor(private http: HttpClient) { }

 /*servicio para guardar una Nueva Tarjeta*/
guardarTarjeta(tarjeta: TarjetaCredito): Observable<TarjetaCredito> {
  return this.http.post<TarjetaCredito>(this.myAppUrl + this.myApApi, tarjeta);
}

/*Servicio para obtener todos los datos del API */
AllUserDetails(): Observable<TarjetaCredito[]> {  
  return this.http.get<TarjetaCredito[]>(this.myAppUrl + this.myApApi);

  }

  /*Servico para eliminar Tarjetas */
eliminarTarjetas(id: number):Observable<TarjetaCredito> {
return this.http.delete<TarjetaCredito>(this.myAppUrl + this.myApApi + id);
}

/*Servicio para Obtener todos los registros de la tabla de tarjetas mediante el llamad a la API */
obtenerTarjetas(): Observable<TarjetaCredito[]> {
  return this.http.get<TarjetaCredito[]>(this.myAppUrl + this.myApApi);
  /*this.http.get(this.myAppUrl + this.myApApi).toPromise()
            .then(data => {
              this.list = data as TarjetaCredito[];
            });*/
}

/*Servicio para actualizar alguna tarjeta */
actualizarTarjeta(id: number, tarjeta: TarjetaCredito):Observable<TarjetaCredito>{
  return this.http.put<TarjetaCredito>(this.myAppUrl + this.myApApi + id, tarjeta);
}

/*Servicio para pasar la data de la tarjeta al formulario de un nuevo valor */
actualizar(tarjeta){
  this.actualizarFormulario.next(tarjeta);
}

/*Servicio para obtener los valores de la tarjeta y pasarla al formulario */
obtenerTarjeta$(): Observable<TarjetaCredito>{
  return this.actualizarFormulario.asObservable();
}

}
