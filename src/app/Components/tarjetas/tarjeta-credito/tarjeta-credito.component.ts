import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { TarjetaService } from 'src/app/Service/tarjeta.service';
import { TarjetaCredito } from 'src/app/Models/TarjetaCredito';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Observable} from 'rxjs';


@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  suscription: Subscription;
  tarjeta: TarjetaCredito;
  idTarjeta = 0;

  constructor(private formBuilder: FormBuilder, 
    private tarjetaService: TarjetaService,
    private toastr: ToastrService) {
    
      /*se crea el formulario con el grupo y se valida cada campo */
    this.form = this.formBuilder.group({
    id: 0,
      titular: ['', [Validators.required]],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)],],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
    })
  }



  /*Obtiene los datos de cada tarjeta y lo pasa al formulario para editarlo */
  ngOnInit(): void {
    this.suscription= this.tarjetaService.obtenerTarjeta$().subscribe(data =>{
      this.tarjeta = data;
      this.form.patchValue({
        titular: this.tarjeta.titular,
        numeroTarjeta: this.tarjeta.numeroTarjeta,
        fechaExpiracion: this.tarjeta.fechaExpiracion,
        cvv: this.tarjeta.cvv
      });
      
      this.idTarjeta = this.tarjeta.id; /*llama al Id de la tarjeta con el id que esta en la tarjeta */
    });
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  /*valida si la tarjeta su id es 0 para ejecutar el metodo guardar si NO editar el componente tarjeta */
  guardarTarjeta() {
    if(this.idTarjeta === 0){
     this.agregar();
      
    }else {
      this.editar();
    }

}

    agregar() {
          /*Se genera una constante para guardar los datos del FORM */
    const tarjeta: TarjetaCredito = {
      titular: this.form.get('titular').value,
      numeroTarjeta: this.form.get('numeroTarjeta').value,
      fechaExpiracion: this.form.get('fechaExpiracion').value,
      cvv: this.form.get('cvv').value,
    }
      this.tarjetaService.guardarTarjeta(tarjeta).subscribe(data => {
        this.toastr.success('Registro Guardado', 'La tarjeta fue Agregada');
        /*this.tarjetaService.obtenerTarjetas();*/
        this.form.reset();
        
    });
    }



    /*Metodo editar tarjeta */
    editar() {
      const tarjeta: TarjetaCredito = {
        id: this.tarjeta.id,
        titular: this.form.get('titular').value,
        numeroTarjeta: this.form.get('numeroTarjeta').value,
        fechaExpiracion: this.form.get('fechaExpiracion').value,
        cvv: this.form.get('cvv').value,
    };
    this.tarjetaService.actualizarTarjeta(this.idTarjeta, tarjeta).subscribe(data => {
      this.toastr.info('Registro Actualizado', 'La tarjeta fue Actualizada');
      /*this.tarjetaService.obtenerTarjetas();*/
      this.form.reset();
      this.idTarjeta = 0;
    });
  }
}