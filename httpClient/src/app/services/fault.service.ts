import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class FaultService {

  constructor(private crudService: CrudService, private alertService:AlertService) { }

  async addFaults (idCourse:number,idMatter:number,idStudent:number,period:number,faults:number) {
    let faultObject: any = {};
    faultObject.idCourse = idCourse;
    faultObject.idMatter = idMatter;
    faultObject.idStudent = idStudent;
    faultObject.period = period;
    faultObject.faults = faults;
    this.crudService.model = 'Fault';
    return await this.crudService.add(faultObject);
  }

  async updateFaults (idCourse:number,idMatter:number,idStudent:number,period:number,faults:number,idFault:number) {
    let faultObject: any = {};
    faultObject.id = idFault;
    faultObject.idCourse = idCourse;
    faultObject.idMatter = idMatter;
    faultObject.idStudent = idStudent;
    faultObject.period = period;
    faultObject.faults = faults;
    this.crudService.model = 'Fault';
    return await this.crudService.update(faultObject);
  }

  async getFaultsInformationByCourse(idCourse:number,idMatter:number,period:number) {
    let sqlQuery = `select Users.id as idStudent,
        Faults.faults,
        Faults.id as idFault
        from Matriculations
        inner join Users
        on Matriculations.idStudent = Users.id
        left join Faults 
        on Faults.idCourse = Matriculations.idCourse
        and Faults.idStudent = Users.id
        where Matriculations.idCourse = `+idCourse+`
        and Faults.period = `+period+`
        and Faults.idMatter = `+idMatter+``;
    this.crudService.model = 'Fault';
    let result = await this.crudService.getDynamicQuery(sqlQuery);
    if(result.result) {
      return result.data;
    } else {
      this.alertService.danger("Fallas - Error al actualizar la información. "+result.message)
    }
  }
}
