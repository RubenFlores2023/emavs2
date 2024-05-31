import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, RowComponent, TableActiveDirective, TableColorDirective, TableDirective, TextColorDirective } from '@coreui/angular';
import { PlantaModel } from '../models/planta.model';
import { PlantaService } from '../services/planta.service';

@Component({
  selector: 'areasverdes',
  standalone: true,
  imports: [RowComponent, ColComponent, CardComponent,
            CardHeaderComponent, CardBodyComponent,
            ReactiveFormsModule ,FormsModule, FormDirective,
            FormSelectDirective,FormControlDirective,
             FormLabelDirective, ButtonDirective, NgStyle,
             TextColorDirective,
             TableDirective, TableColorDirective, TableActiveDirective],
  templateUrl: './planta.component.html',
  styleUrl: './planta.component.scss'
})


export class PlantaComponent {
  listaPlantas : PlantaModel[] = [];
  plantaModelo : PlantaModel = new PlantaModel();
  /**
   *
   */
  constructor(private plantaService: PlantaService) {
    this.getPlantas();
    
  }

    
  getPlantas(){
    this.plantaService.getTodasLasPlantas().subscribe({
      next : (respuesta) => {
          console.log(respuesta);
          this.listaPlantas = respuesta;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  guardarPlanta(){
    console.log(this.plantaModelo);
    if (this.plantaModelo._id == '') {
      console.log("guardar", this.plantaModelo);
      this.agregarPlanta();
    } else {
      console.log("editar", this.plantaModelo);
      this.editarPlanta();
    }


  }
  agregarPlanta(){
    this.plantaService.agregarPlantas(this.plantaModelo).subscribe({
      next : (respuesta) => {
          console.log("Se guardo exitosamente",respuesta);
          this.getPlantas();
          this.plantaModelo = new PlantaModel();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  eliminarPlanta(planta: PlantaModel){
    console.log("itema para eliminar", planta);
    this.plantaService.eliminarPlantas(planta._id).subscribe({
      next : (respuesta) => {
          console.log("Se elimino exitosamente",respuesta);
          this.getPlantas();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  verReceta(planta: PlantaModel){
    this.plantaModelo = planta;
  }

  editarPlanta(){
    this.plantaService.editarPlantas(this.plantaModelo).subscribe({
      next : (respuesta) => {
          console.log("Se edito exitosamente",respuesta);
          this.getPlantas();
          this.plantaModelo = new PlantaModel();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}