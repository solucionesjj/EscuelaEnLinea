import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class LegalGuardianQualifyService {

  constructor(private crudService: CrudService) {
  }

  async getLegalGuardianQualify(idCourse: number, period: number) {
    const query = "select m.idStudent, m.id as idMatriculations, lgq.id as idLegalGuardianQualify, lgq.idLegalGuardianQualifyCatalog, lgq.bimestre , a.aspect, lgqc.qualify from LegalGuardianQualify as lgq inner join LegalGuardianQualifyCatalog as lgqc on lgq.idLegalGuardianQualifyCatalog =  lgqc.id inner join Matriculations as m on m.id = lgq.idMatriculations inner join Aspects as a on a.id = lgqc.idAspect where m.idCourse = "+idCourse.toString()+" and lgq.bimestre = "+period.toString()+" order by m.idStudent,a.aspect, lgqc.qualify asc";
    let result = await this.crudService.getDynamicQuery(query);
    return result;
  }

  async getMatriculations(idCourse: number) {
    const query = "select u.identificationDocument, concat(u.name,' ',u.surname) as fullName , m.id as idMatriculations from Matriculations as m inner join Users as u on m.idStudent = u.id where m.idCourse = " + idCourse.toString() +" order by 2 asc";
    let result = await this.crudService.getDynamicQuery(query);
    return result;
  }

  async getIdLegalGuardianQualify(idMatriculation: number, idLegalGuardianQualifyCatalog: number, period: number) {
    let idLegalGuardianQualify = 0;
    const query = "select id as idLegalGuardianQualify from LegalGuardianQualify as lgq where lgq.idMatriculations = " + idMatriculation.toString() + " and lgq.idLegalGuardianQualifyCatalog = " + idLegalGuardianQualifyCatalog.toString() + " and lgq.bimestre = " + period.toString();
    const result = await this.crudService.getDynamicQuery(query);
    if (result.data.length > 0) {
      idLegalGuardianQualify = result.data[0].idLegalGuardianQualify;
    }
    return idLegalGuardianQualify;
  }

  async setLegalGuardianQualify(idMatriculation: number, idLegalGuardianQualifyCatalog: number, period: number) {
    this.crudService.model = 'LegalGuardianQualify';
    const legalGuardianQualifyObject = {
      idMatriculations: idMatriculation,
      bimestre: period,
      idLegalGuardianQualifyCatalog: idLegalGuardianQualifyCatalog
    }
    const result = await this.crudService.add(legalGuardianQualifyObject);
    return result;
  }

  async deleteLegalGuardianQualify(idLegalGuardianQualify: number) {
    this.crudService.model = 'LegalGuardianQualify';
    const legalGuardianQualifyObject = {
      id: idLegalGuardianQualify
    }
    const result = await this.crudService.delete(legalGuardianQualifyObject);
    return result;
  }
}
