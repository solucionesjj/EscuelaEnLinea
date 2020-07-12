import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { ReportService } from '../services/report.service';
import { UserService } from '../services/user.service';
declare var $: any;
@Component({
  selector: 'app-students-information',
  templateUrl: './students-information.component.html',
  styleUrls: ['./students-information.component.css']
})
export class StudentsInformationComponent implements OnInit {


  filterData: any = [];
  filterDataLoaded: boolean = false;
  selectedIdCourse: number = 0;
  selectedIdStudent: number = 0;
  selectedReportType: number = 0;
  selectedPeriod: number = 0;
  generatedReports:string = '';
  reportDataLoaded:boolean = true;
  userInformation: any = {};

  constructor(private crudService: CrudService,
    private reportService: ReportService,
    private userService: UserService) { 
    this.userInformation = this.userService.getLoggedUserInformation();
    this.getFilterInformation();
  }

  ngOnInit() {
  }

  async generateReport(){
    this.reportDataLoaded = false;
    if(this.selectedIdCourse > 0 && this.selectedIdCourse > 0) {
      if(this.selectedPeriod > 0) {
        const report = await this.reportService.getReport(this.selectedIdStudent.toString(), this.selectedIdCourse.toString(), this.selectedPeriod.toString(), this.selectedReportType);
        this.generatedReports = report;
      } else {
        alert('Por favor seleccionar el periodo.')
      }
    } else {
      alert('Por favor seleccionar el estudiante.')
    }
    this.reportDataLoaded = true;
  }

  selectFilter(filterObject:any, htmlObject:any) {
    this.generatedReports = '';
    this.selectedIdCourse = filterObject.idCourse;
    this.selectedIdStudent = filterObject.idStudent;
    this.selectedReportType = filterObject.idReportCardModel;
    $('#listFilters>li.active').removeClass('active');
    $(htmlObject).addClass('active');
  }

  selectPeriod(period:number, htmlObject:any) {
    this.generatedReports = '';
    this.selectedPeriod = period;
    $('#listPeriods>li.active').removeClass('active');
    $(htmlObject).addClass('active');
  }


  async getFilterInformation()
  {
    this.filterDataLoaded = false;
    let sqlQuery = `
    select c.id as idCourse, c.year, c.course, u.id as idStudent, u.surname, u.name, c.idReportCardModel
    from Users as u
    inner join Matriculations as m
      on u.id = m.idStudent
    inner join Courses as c
      on m.idCourse = c.id
        and c.active  = 1
    where (u.idFather = `+this.userInformation.id+` or u.idMother = `+this.userInformation.id+` or idStudent = `+this.userInformation.id+`)
    order by u.surname, u.name, c.year desc, c.order desc
    `;
    const result = await this.crudService.getDynamicQuery(sqlQuery)
    if(result.result) {
      this.filterData = result.data;
    } else {
      alert('Error al consultar la información de los filtros.')
      console.log(result)
    }
    this.filterDataLoaded = true;
  }
}
