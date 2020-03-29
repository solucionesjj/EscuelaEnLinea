import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  directorList: any = [];

  constructor(private crudService: CrudService) {
  }

  async get() {
    await this.getDirectorList();
    return this.directorList;
  }

  async getDirectorList() {
    this.directorList = [];
    this.crudService.model = 'User';
    const sqlQuery = `select Users.id, Users.name, Users.surname from UserGroups inner join Users on Users.id = UserGroups.idUser inner join Groups on Groups.id = UserGroups.idGroup where Groups.group = 'Director' order by Users.name, Users.surname`;
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      for (const row of result.data) {
        this.directorList.push({ id: row.id, value: row.name + ' ' + row.surname });
      }
    } else {
      alert('Error al consultar el catálogo de profesores.')
      console.log(result)
    }
  }
}
