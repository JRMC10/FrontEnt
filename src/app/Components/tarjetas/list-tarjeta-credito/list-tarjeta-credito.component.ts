import { Component, OnInit, ViewChild } from '@angular/core';
import { TarjetaCredito } from 'src/app/Models/TarjetaCredito';
import { TarjetaService } from 'src/app/Service/tarjeta.service';
import { ToastrService } from 'ngx-toastr';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-tarjeta-credito',
  templateUrl: './list-tarjeta-credito.component.html',
  styleUrls: ['./list-tarjeta-credito.component.css']
})
export class ListTarjetaCreditoComponent implements OnInit {
  tarjeta:TarjetaCredito[];
  dataSource: MatTableDataSource<TarjetaCredito>; 
  displayedColumns: string[] = ['titular', 'numeroTarjeta', 'fechaExpiracion','Acciones'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; 
  @ViewChild(MatSort) sort: MatSort;  
 

  /*se declara el servicio y manda a llamar al dataSource */
  constructor(public tarjetaService: TarjetaService, public toastr: ToastrService,){
    this.tarjetaService.AllUserDetails().subscribe(data =>{
      this.dataSource = new MatTableDataSource<TarjetaCredito>(data);

      /*Se llama al paginador y sort del dataSource */
      this.dataSource.paginator = this.paginator;  
      this.dataSource.sort = this.sort;    

    });
  }
  
  
  ngOnInit(){
    /*this.tarjetaService.obtenerTarjetas();*/
    /*this.dataSource.paginator = this.paginator;*/
    /*this.dataSource.sort = this.sort; */
  }

  /* filtrado, paginador de la tabla */
  applyFilter(filterValue: string) {  
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {  
      this.dataSource.paginator.firstPage();  
    }  
  }
  
/* Obtiene los nuevos datos de la tabla */
obtenerTarjeta(){
  this.tarjetaService.obtenerTarjetas().subscribe((data: TarjetaCredito[]) => {
    this.dataSource.data = data;
  });
}

/* Metodo para eliminar los datos de la tabla */
  eliminarTarjeta(id: number){
    if(confirm('Desea Eliminar el Registro?')){
      this.tarjetaService.eliminarTarjetas(id).subscribe(data =>{
        this.toastr.warning('Registro Eliminado', 'La Tarjeta fue Eliminada');
        /*this.tarjetaService.obtenerTarjetas();*/
      })
    }
  }

  /*Metodo donde manda a llamar a editar para actualizar la tarjeta */
  editar(tarjeta){
    this.tarjetaService.actualizar(tarjeta);
  }
}
