import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any = {};

  constructor(private crudService: CrudService) {

  }



  

async getNextYearCourse(idStudent: number) {
  this.crudService.model = 'Courses';
  const sqlQuery = `select c.course from Matriculations as m 
  inner join Courses as c 
  on m.idCourse = c.id 
  where m.idStudent = `+idStudent+` 
  and c.year = year(date_add(current_date(), interval 1 year))`;
  const result = await this.crudService.getDynamicQuery(sqlQuery);
  if (result.result) {
    return result.data[0];
  } else {
    alert('Error al consultar la información de la matricula para el siguiente año.')
    console.log(result);
    return {};
  }
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
    this.user.Groups = this.getUsertGroups(idUser);
    return this.user;
  }

  async getUsertGroups(idUser: string) {
    let userGroupsObject: any = [];
    this.crudService.model = 'Group';
    const sqlQuery = `select g.group, ug.idGroup from UserGroups as ug inner join Groups as g on ug.idGroup = g.id where ug.idUser = ` + idUser;
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      result.data.forEach(item => {
        userGroupsObject.push({ idGroup: item.idGroup, group: item.group });
      });
    }
    if (userGroupsObject.length === 0) {
      userGroupsObject.push({ idGroup: 0, group: 'Sin grupos' });
    }
    return userGroupsObject;
  }

  async isAdministrator(idUser: string) {
    let isAdministrator: boolean = false;
    const userGroups = await this.getUsertGroups(idUser);
    userGroups.forEach(group => {
      if (group.group == 'Administrador') { isAdministrator = true; }
    });
    return isAdministrator;
  }

  async areLoggedOnAsAnAdministrator() {
    const user = this.getLoggedUserInformation();
    let isAdministrator: boolean = false;
    const userGroups = await this.getUsertGroups(user.id);
    userGroups.forEach(group => {
      if (group.group == 'Administrador') { isAdministrator = true; }
    });
    return isAdministrator;
  }  

  getLoggedUserInformation() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }
}
