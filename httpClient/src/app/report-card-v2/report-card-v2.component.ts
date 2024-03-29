import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { UserService } from '../services/user.service';
import { PeriodService } from '../services/period.service';
import { ReportService } from '../services/report.service';
import { CourseService } from '../services/course.service';
import { LegalGuardianQualifyService } from '../services/legal-guardian-qualify.service';

@Component({
  selector: 'app-report-card-v2',
  templateUrl: './report-card-v2.component.html',
  styleUrls: ['./report-card-v2.component.css']
})
export class ReportCardV2Component implements OnInit {

  idUser: string;
  footerInformation: string = '';
  performanceInformation: string = '';
  schoolInformation: string = '';

  boletinData: any = [];

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

  legalGuardianQualifyData: any = [];

  constructor(private crudService: CrudService,
    private userService: UserService,
    private periodService: PeriodService,
    private reportService: ReportService,
    private courseService: CourseService,
    private legalGuardianQualifyService: LegalGuardianQualifyService) {
    let initialYear: number = this.currentYear - this.range;
    const finalYear = initialYear + (this.range * 2);
    for (let actualYear = initialYear; actualYear <= finalYear; actualYear++) {
      this.yearList.push({ value: actualYear, text: actualYear });
    }
    this.selectedYear = this.currentYear;

    this.getAcutalPeriod().then(result => {
      this.getReportCardConfigList().then(result => {
        this.loadCourses().then(result => { 
          this.getGeneralPerformanceInformation().then( result => { 
            this.getSchoolInformationHtml().then( result => {
              this.filtersLoaded = true; 
              });              
            });
          });
        });
      });
    }

  async getGeneralPerformanceInformation() {
      this.performanceInformation = await this.reportService.getGeneralPerformanceInformation();
    }
  async getSchoolInformationHtml() {
    this.schoolInformation = await this.reportService.getSchoolInformationHtml();
  }

  async getBasicInformation(idStudent: string, idCourse: string, period: string) {
    let basicInformation = await this.reportService.getBasicInformation(idStudent, idCourse, period);
    return basicInformation;
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
    this.courseLists = [];
    const result = await this.courseService.getCourses(this.selectedYear.toString());
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

  Number(number: string) {
    return parseInt(number);
  }

  async generateReportList() {
    this.legalGuardianQualifyData = [];
    this.legalGuardianQualifyData = await this.legalGuardianQualifyService.getLegalGuardianQualify(parseInt(this.selectedCourse), parseInt(this.selectedPeriod));
    this.legalGuardianQualifyData = this.legalGuardianQualifyData.data;
    this.footerInformation = await this.reportService.getFooterInformation(this.selectedCourse);
    this.boletinData = [];
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
                this.boletinData.push( await this.reportService.getBoletin(this.selectedCourse,this.studentsList[index].id));
              } else {
                ////idStudent equal to 0
              }
            }
          } else {
            if (parseInt(this.selectdStudent) > 0) {
              ////Print report of specific student
              this.boletinData.push(await this.reportService.getBoletin(this.selectedCourse,this.selectdStudent));
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

  getQualificationData(idStudent: number) {
    let qualificationData = [];
    this.legalGuardianQualifyData.forEach(data => {
      if(data.idStudent == idStudent) { 
        qualificationData.push({idStudent: idStudent, aspect: data.aspect,qualify: data.qualify});
      }
    });
    console.log(qualificationData);
    return qualificationData;
  }

  ngOnInit() {
  }

}
