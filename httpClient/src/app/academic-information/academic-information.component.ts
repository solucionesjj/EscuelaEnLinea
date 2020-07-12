import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { ReportService } from '../services/report.service';
import { UserService } from '../services/user.service';
declare var $: any;
@Component({
  selector: 'app-academic-information',
  templateUrl: './academic-information.component.html',
  styleUrls: ['./academic-information.component.css']
})
export class AcademicInformationComponent implements OnInit {


  filterData: any = [];
  filterDataLoaded: boolean = false;
  selectedIdCourse: number = 0;
  selectedIdStudent: number = 0;
  selectedReportType: number = 0;
  selectedPeriod: number = 0;
  reportDataLoaded: boolean = true;
  userInformation: any = {};
  gradeInformation: any = [];

  constructor(private crudService: CrudService,
    private reportService: ReportService,
    private userService: UserService) {
    this.userInformation = this.userService.getLoggedUserInformation();
    this.getFilterInformation();
  }

  ngOnInit() {
  }

  async generateReport() {
    this.reportDataLoaded = false;
    if (this.selectedIdCourse > 0 && this.selectedIdCourse > 0) {
      if (this.selectedPeriod > 0) {

        let sqlQuery = `select  concat(u.name,' ',u.surname) as teacherName, 
                                a.area, 
                                m.matter, 
                                al.hoursPerWeek, 
                                gd.grade as gradeName, 
                                gd.description as gradeDescription, 
                                gd.dueDate as gradeDueDate, 
                                gi.grade
                        from AcademicLoads as al
                        inner join GradeDefinitions as gd
                          on gd.idAcademicLoad = al.id
                        inner join Matters as m
                          on al.idMatter = m.id
                        inner join Areas as a 
                          on m.idArea = a.id
                        inner join Users as u
                          on al.idTeacher = u.id
                        left join GradeInformations as gi
                          on gi.idGradeDefinition = gd.id
                            and gi.period = gd.period
                        where gi.idStudent = `+ this.selectedIdStudent + `
                        and gi.period = `+ this.selectedPeriod + `
                        and al.idCourse = `+ this.selectedIdCourse + `
                        order by a.order, m.matter, gd.dueDate
                        `;

        const result = await this.crudService.getDynamicQuery(sqlQuery);
        if(result.result) {
          this.gradeInformation = result.data;
        } else {
          alert('Error al consultar la información de notas')
          console.log(result)
        }
      } else {
        alert('Por favor seleccionar el periodo.')
      }
    } else {
      alert('Por favor seleccionar el estudiante.')
    }
    this.reportDataLoaded = true;
  }

  selectFilter(filterObject: any, htmlObject: any) {
    this.selectedIdCourse = filterObject.idCourse;
    this.selectedIdStudent = filterObject.idStudent;
    this.selectedReportType = filterObject.idReportCardModel;
    $('#listFilters>li.active').removeClass('active');
    $(htmlObject).addClass('active');
  }

  selectPeriod(period: number, htmlObject: any) {
    this.selectedPeriod = period;
    $('#listPeriods>li.active').removeClass('active');
    $(htmlObject).addClass('active');
  }


  async getFilterInformation() {
    this.filterDataLoaded = false;
    let sqlQuery = `
    select c.id as idCourse, c.year, c.course, u.id as idStudent, u.surname, u.name, c.idReportCardModel
    from Users as u
    inner join Matriculations as m
      on u.id = m.idStudent
    inner join Courses as c
      on m.idCourse = c.id
        and c.active  = 1
    where (u.idFather = `+ this.userInformation.id + ` or u.idMother = ` + this.userInformation.id + ` or idStudent = ` + this.userInformation.id + `)
    order by u.surname, u.name, c.year desc, c.order desc
    `;
    const result = await this.crudService.getDynamicQuery(sqlQuery)
    if (result.result) {
      this.filterData = result.data;
    } else {
      alert('Error al consultar la información de los filtros.')
      console.log(result)
    }
    this.filterDataLoaded = true;
  }

}
