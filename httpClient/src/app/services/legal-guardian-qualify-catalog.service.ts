import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class LegalGuardianQualifyCatalogService {

  constructor(private crudService: CrudService, private alertService: AlertService) { 
 }
  async getLegalGuardianQualifyCatalog() {
    const query = 'select LegalGuardianQualifyCatalog.id, Aspects.aspect, LegalGuardianQualifyCatalog.qualify from LegalGuardianQualifyCatalog inner join Aspects on LegalGuardianQualifyCatalog.idAspect = Aspects.id order by Aspects.aspect, LegalGuardianQualifyCatalog.qualify';
    let result = await this.crudService.getDynamicQuery(query);
    return result;
  }
}
