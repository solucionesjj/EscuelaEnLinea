import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-grade-definition-error',
  templateUrl: './grade-definition-error.component.html',
  styleUrls: ['./grade-definition-error.component.css']
})
export class GradeDefinitionErrorComponent implements OnInit {

  academicLoadInfo: any = [];

  constructor(private crudService: CrudService) {
    this.loadAcademicLoadInfo().then(info => console.log(this.academicLoadInfo));

   }


  async loadAcademicLoadInfo() {
    const query = `select c.year, c.course, concat(u.name,' ',u.surname) as teacher, a.area, m.matter, datos.period 
                    from AcademicLoads as al
                    inner join (select idAcademicLoad, period from (
                          select  gd.idAcademicLoad, ifnull(gd.period,0) as period, gi.idStudent, sum((gi.grade * gd.weight)/100) as grade
                          from GradeDefinitions as gd
                          inner join GradeInformations as gi
                            on gi.idGradeDefinition = gd.id
                            and ifnull(gi.period,0) = ifnull(gd.period,0)
                          group by gd.idAcademicLoad, gd.period, gi.idStudent
                          ) datos 
                          where datos.grade > 5
                          group by idAcademicLoad, period) datos
                      on datos.idAcademicLoad = al.id
                    inner join Matters as m
                      on m.id = al.idMatter
                    inner join Areas as a
                      on m.idArea = a.id
                    inner join Courses as c
                      on al.idCourse = c.id
                    inner join Users as u
                      on al.idTeacher = u.id
                    where year = year(current_date())
                    order by c.year, c.order, concat(u.name,' ',u.surname), a.order, m.matter, datos.period`;
    this.crudService.model = 'AcademicLoad';
    const result = await this.crudService.getDynamicQuery(query);
    if (result.result) {
      if (result.data) {
        this.academicLoadInfo = result.data;
      } else {
        console.log('No se encontraron datos.');
      }
    } else {
      console.log(result.message);
    }
  }
  
  ngOnInit() {
  }

}
