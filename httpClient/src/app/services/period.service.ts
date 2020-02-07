import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  actualPeriod: string;

  constructor(private crudService: CrudService) {
  }

  async get() {
    await this.getActualPeriod();
    return this.actualPeriod;
  }

  async getActualPeriod() {
    this.actualPeriod = '';
    this.crudService.model = 'Parameter';
    const query = `select value from Parameters where parameter = 'periodoActual' limit 0, 1`;
    const result = await this.crudService.getDynamicQuery(query);    
    if (result.result) {
      if (result.data) {
        this.actualPeriod = result.data[0].value;
      } else {
        console.log('No se encontraron datos.');
      }
    } else {
      console.log(result.message);
    }
  }
}
