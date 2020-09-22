import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; /*Con esto se importan los form REACTIVOS */
import { HttpClientModule } from '@angular/common/http';/*con esto se comunica con el BackEnd*/ 
import { MatSliderModule } from '@angular/material/slider';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { TarjetasComponent } from './Components/tarjetas/tarjetas.component';
import { TarjetaCreditoComponent } from './Components/tarjetas/tarjeta-credito/tarjeta-credito.component';
import { ListTarjetaCreditoComponent } from './Components/tarjetas/list-tarjeta-credito/list-tarjeta-credito.component';
import { FooterComponent } from './Components/footer/footer.component';

import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    TarjetasComponent,
    TarjetaCreditoComponent,
    ListTarjetaCreditoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatSliderModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
