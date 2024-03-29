import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class AspectService {
  aspects: any = {};
  constructor(private crudService: CrudService) { }

  async get() {
    this.crudService.model = 'Aspects';
    const query = `SELECT id as id, aspect as value FROM Aspects order by aspect`;
    const result = await this.crudService.getDynamicQuery(query);
    if (result.result) {
      if (result.data.length > 0) {
        this.aspects = result.data;
      } else {
        console.log('No se encontró datos en el catalogo de Aspectos.');
      }
    } else {
      console.log(result.message);
    }
    return this.aspects;
  }
}