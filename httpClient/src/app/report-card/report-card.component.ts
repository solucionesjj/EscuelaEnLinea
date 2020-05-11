import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { UserService } from '../services/user.service';
import { PeriodService } from '../services/period.service';
import { ReportService } from '../services/report.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css']
})
export class ReportCardComponent implements OnInit {

  idUser: string;

  selectedYear: number = 0;
  range: number = 5;
  yearList: any = [];
  currentYear: number = (new Date()).getFullYear();

  selectedPeriod: string = '0';

  idReportCardModelSelected: string = '0';
  reportCardModelList: any = [];

  courseLists: any = [];

  studentsList: any = [];
  selectdStudent: string = '';

  selectedCourse: string = '';

  filtersLoaded: boolean = false;

  generatedReports: string = '';

  loadingReports: boolean = false;

  constructor(private crudService: CrudService,
    private userService: UserService,
    private periodService: PeriodService,
    private reportService: ReportService,
    private courseService: CourseService) {


    let initialYear: number = this.currentYear - this.range;
    const finalYear = initialYear + (this.range * 2);
    for (let actualYear = initialYear; actualYear <= finalYear; actualYear++) {
      this.yearList.push({ value: actualYear, text: actualYear });
    }
    this.selectedYear = this.currentYear;

    this.getAcutalPeriod().then(result => {
      this.getReportCardConfigList().then(result => {
        this.loadCourses().then(result => {
          this.filtersLoaded = true;
        })
      })
    });
  }

  async getAcutalPeriod() {
    this.selectedPeriod = await this.periodService.getActualPeriod();
  }

  async getReportCardConfigList() {
    this.reportCardModelList = await this.reportService.getReportModelList();
  }

  async loadStudentsList(idCourse) {
    this.studentsList = []
    const result = await this.courseService.getStudentsOrderBySurname(idCourse);
    if (result.length > 0) {
      this.studentsList = result.map((record) => { return { id: record.idStudent, value: record.fullName + ' - ' + record.identificationDocument }; });
      this.studentsList.push({ id: 0, value: 'TODOS.' });
    } else {
      this.studentsList.push({ id: 0, value: 'No se encontraron estudiantes en el curso seleccionado.' });
    }
  }

  async loadCourses() {
    const result = await this.courseService.getCourses(this.currentYear.toString());
    if (result.length > 0) {
      result.forEach(course => { this.courseLists.push({ value: course.idCourse, text: course.course + ' - ' + course.reportCardModelName , idReportCardModel: course.idReportCardModel }) });
    } else {
      this.courseLists.push({ value: '0', text: 'No se encontraron años para el curso actual.' })
    }
  }

  loadStudents() {
    this.studentsList = [];
    if (parseInt(this.selectedCourse) > 0) {
      this.loadStudentsList(this.selectedCourse);
    }
  }

  async generateReportList() {
    this.loadingReports = true;
    this.generatedReports = '';
    let reportType: number = 0;
    this.courseLists.forEach(course => {
      if (course.value == parseInt(this.selectedCourse)) {
        reportType = course.idReportCardModel;
      }
    });

    if (this.selectedYear > 0) {
      if (parseInt(this.selectedPeriod) > 0) {
        if (parseInt(this.selectedCourse) > 0) {
          if (parseInt(this.selectdStudent) == 0) {
            ////Print reports of all students of selected course
            for (let index = 0; index < this.studentsList.length; index++) {
              if (parseInt(this.studentsList[index].id) > 0) {
                const report = await this.reportService.getReport(this.studentsList[index].id, this.selectedCourse, this.selectedPeriod, reportType);
                this.generatedReports = this.generatedReports + report;
              } else {
                ////idStudent equal to 0
              }
            }
          } else {
            if (parseInt(this.selectdStudent) > 0) {
              ////Print report of specific student
              this.generatedReports = await this.reportService.getReport(this.selectdStudent, this.selectedCourse, this.selectedPeriod, reportType);
            } else {
              alert('Por favor seleccione uno o todos los  estudiante.')
            }
          }
        } else {
          alert('Por favor seleecione un curso.')
        }
      } else {
        alert('Por favor seleccione un periodo.')
      }
    } else {
      alert('Por favor seleccione el año.')
    }
    this.loadingReports = false;
  }

  ngOnInit() {
  }

}
