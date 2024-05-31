import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PlantaModel } from "../models/planta.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn : 'root'
})

export class PlantaService {
  //url de su api (backend)
  private API_URL = 'http://localhost:9000/plantas'
  constructor(private http: HttpClient) {

  }

  getTodasLasPlantas (): Observable<PlantaModel[]> {
    return this.http.get<PlantaModel[]>(`${this.API_URL}/getplantas`);
  }

  agregarPlantas (planta: PlantaModel) : Observable<PlantaModel> {
    return this.http.post<PlantaModel>(`${this.API_URL}/crear`, planta);
  }

  editarPlantas (planta: PlantaModel) : Observable<PlantaModel> {
    return this.http.put<PlantaModel>(`${this.API_URL}/editar/${planta._id}`, planta);
  }

  eliminarPlantas (idPlanta : string) : Observable<PlantaModel> {
    console.log(idPlanta);
    // return this.http.delete<RecetaModel>(`${this.API_URL}/eliminar/${idReceta}`);
    return this.http.delete<PlantaModel>(this.API_URL+'/eliminar/'+idPlanta);

  }
}