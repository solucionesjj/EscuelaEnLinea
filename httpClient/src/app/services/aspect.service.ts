import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class AspectService {
  aspects: any = {};
  constructor(private crudService: CrudService) { }

  async get() {
    let result = await this.getAspects();
    return result;
  }

  async getAspects() {
    this.crudService.model = 'Aspects';
    const query = `SELECT id, aspect FROM Aspects order by aspect`;
    const result = await this.crudService.getDynamicQuery(query);
    if (result.result) {
      if (result.data) {
        this.aspects = result.data[0].value;
      } else {
        console.log('No se encontraron datos.');
      }
    } else {
      console.log(result.message);
    }
    return this.aspects;
  }
}