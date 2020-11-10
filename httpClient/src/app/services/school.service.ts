import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private crudService: CrudService) { }

  async getSchoolInformation() {
    this.crudService.model = 'SchoolInformation';
    const sqlQuery = `	select si.name, 
    si.address,
    concat(u.name,' ',u.surname) as directorName,
    concat(u.identificationDocumentType,': ', u.identificationDocument) as directorIdentification, 
    si.webPage,
    si.approval,
    si.country,
    si.department,
    si.city,
    si.urlLogoImage,
    si.urlCertificationImage,
    si.telephone1,
    si.telephone1Description,
	  si.telephone2,
    si.telephone2Description,
  	si.telephone3,
    si.telephone3Description,
    si.email1,
    si.email1Description,
    si.email2,
    si.email2Description,
    si.email3,
    si.email3Description
    from SchoolInformations as si
    left join Users as u
    on u.id = si.idDirector`
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      return result.data[0];
    } else {
      alert('Error al consultar la información de la institución.')
      console.log(result);
      return {};
    }
  }
}
