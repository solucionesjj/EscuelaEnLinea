import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any = {};

  constructor(private crudService: CrudService) {

  }

  async getUserInformation(idUser: string) {
    this.crudService.model = 'User';
    const searchCriteria = '{"where":{"id":"' + idUser + '"}}'
    const result = await this.crudService.getSearch(searchCriteria);
    if (result.result) {
      if (result.data) {
        this.user = result.data[0];
        this.user.CompleteName = this.user.name + ' ' + this.user.surname;
      } else {
        console.log('No se encontraron datos para el usuario con id: ' + idUser)
      }
    } else {
      console.log('Error al consultar el usuario con id: ' + idUser)
    }
    return this.user;
  }
}
