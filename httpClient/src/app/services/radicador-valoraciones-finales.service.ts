import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class RadicadorValoracionesFinalesService {

  constructor(private crudService:CrudService, private alertService: AlertService) {}

  

   async getRadicadorValoracionesFinalesData(idCourse:number) {
    let sqlQuery = `select 	c.course as course, 
                            concat(u.surname," ",u.name) as name, 
                            a.area as area, 
                            mt.matter as matter, 
                            al.hoursPerWeek as ihs, 
                            grades.finalGrade, 
                            ifnull(p.performance,'No definido') as performance,
                            u.identificationDocument as studentIdentification,
                            u.identificationDocumentType as studentIdentificationType,
                            u.identificationDocumentExpeditionSite as studentIdentificationSite,
                            u.id as studentId
                    from  Courses as c  
                    inner join Matriculations as m  
                      on c.id = m.idCourse  
                    inner join Users as u  
                      on u.id = m.idStudent  
                    inner join AcademicLoads as al  
                      on al.idCourse = c.id  
                    inner join Matters as mt  
                      on mt.id = al.idMatter  
                    inner join Areas as a  
                      on a.id = mt.idArea  
                    inner join (select idStudent, idMatter, sum(average) / 4 as finalGrade   
                                from (  
                                select gi.idStudent, gd.period, al.idMatter, avg(gi.grade) average  
                                from AcademicLoads as al  
                                inner join GradeDefinitions as gd  
                                on al.id  = gd.idAcademicLoad   
                                inner join GradeInformations as gi  
                                on gi.idGradeDefinition = gd.id   
                                and gi.period = gd.period
                                where al.idCourse = `+idCourse+`  
                                group by gd.period , al.idMatter , gi.idStudent   
                                order by gd.period, al.idMatter, gi.idStudent  
                                ) grades  
                            group by idStudent, idMatter) grades  
                      on grades.idStudent = u.id   
                      and grades.idMatter = mt.id   
                    left join Performances as p  
                        on grades.finalGrade between p.from and p.to  
                    where  c.id = `+idCourse+`  
                    order by concat(u.surname," ",u.name) asc, a.order asc, mt.matter asc`;
    this.crudService.model = 'Course';
    let result = await this.crudService.getDynamicQuery(sqlQuery);
    if(result.result) {
      return result.data;
    } else {
      this.alertService.danger("Fallas - Error al actualizar la información. "+result.message)
    }
  }
}
