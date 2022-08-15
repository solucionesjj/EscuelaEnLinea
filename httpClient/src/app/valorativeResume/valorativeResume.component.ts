import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { CourseService } from '../services/course.service';
import { AlertService } from '../services/alert.service';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-valorativeResume',
  templateUrl: './valorativeResume.component.html',
  styleUrls: ['./valorativeResume.component.css']
})
export class ValorativeResumeComponent implements OnInit {

  studentsData: any = [];
  areasAndMattersData: any = [];
  boletinData: any = [];

  idCourse: number;

  selectedYear: number = 0;
  range: number = 5;
  yearList: any = [];
  currentYear: number = (new Date()).getFullYear();
  courseLists: any = [];
  selectedCourse: string = '0';
  showData: boolean = false;

  constructor(private crudService: CrudService, private courseService: CourseService, private alertService: AlertService, private datepipe: DatePipe) {
    let initialYear: number = this.currentYear - this.range;
    const finalYear = initialYear + (this.range * 2);
    for (let actualYear = initialYear; actualYear <= finalYear; actualYear++) {
      this.yearList.push({ value: actualYear, text: actualYear });
    }
    this.selectedYear = this.currentYear;

    this.loadCourses()
  }

  ngOnInit() {
  }

  async loadCourses() {
    this.courseLists = [];
    const result = await this.courseService.getCourses(this.selectedYear.toString());
    if (result.length > 0) {
      result.forEach(course => { this.courseLists.push({ value: course.idCourse, text: course.course }) });
      this.courseLists.push({value:'0',text:''})
    } else {
      this.courseLists.push({ value: '0', text: 'No se encontraron años para el curso actual.' })
    }
  }

  
  loadValorativeResumenNew () {
    this.showData = false;
    this.idCourse = parseInt(this.selectedCourse);
    this.getValorativeDataNew(this.idCourse).then(result => {
      this.showData = true;
    })
  }
 
  async getValorativeDataNew(idCourse: number) {
    this.studentsData = [];
    this.areasAndMattersData = [];
    this.boletinData = [];

    let sqlQuery = '';

    if (idCourse > 0) {
      sqlQuery = `select * from vBoletinCompleteInfo where idcourse = ` + idCourse + ` order by surname, area, matter `;
      this.crudService.model = 'Matter';
      const result = await this.crudService.getDynamicQuery(sqlQuery);
      if (result.result) {
        if (result.data.length > 0) {

          this.boletinData = result.data;

          let temporalStudentsData = this.boletinData.map(data => { return {idStudent: data.idStudent, name: data.name, surname: data.surname}} );

          temporalStudentsData.forEach(data => {
            let found = false;
            this.studentsData.forEach(element => { 
              if (element.idStudent === data.idStudent)
              {
                found = true;
              }
            });
            if(!found) {this.studentsData.push(data);}
          });

         let temporalAreasAndMattersData = this.boletinData.map(data => { return {idArea: data.idArea, area: data.area, idMatter: data.idMatter, matter: data.matter}} );
         temporalAreasAndMattersData.forEach(data => {
          let found = false;
          this.areasAndMattersData.forEach(element => { 
            if (element.idArea === data.idArea && element.idMatter === data.idMatter)
            {
              found = true;
            }
          });
          if(!found) {this.areasAndMattersData.push(data);}
        });      

        } else {
          this.alertService.warning('No se encontraron datos para el informe valorativo.')
          console.log(result);
        }
      } else {
        this.alertService.warning('Se presentó error al consultar la información del informe valorativo.');
        console.log(result);
      }
    } else {
      this.alertService.warning('Por favor seleccione un curso para consultar la información del informe valorativo.');
      console.log(idCourse);
    }
  }

  getCourseName() {
    return this.boletinData[0].course;
  }

  getGradeNew(period, idArea, idMatter, idStudent) {
    let foundGrade = 0.0;
    this.boletinData.forEach(grade => {
      if(grade.idArea == idArea && grade.idMatter == idMatter && grade.idStudent == idStudent) {
        switch (period) {
          case 1:
            foundGrade = grade.P1_finalGrade;
          break;

          case 2:
            foundGrade = grade.P2_finalGrade;
          break;  

          case 3:
            foundGrade = grade.P3_finalGrade;
          break;

          case 4:
            foundGrade = grade.P4_finalGrade;
          break;
        }
      }
    });
    return foundGrade;
  }

  getAverageByPeriod(period, idStudent) {
    let grades = [];
    this.boletinData.forEach(grade => {
      if(grade.idStudent == idStudent) {
        switch (period) {
          case 1:
            if(grade.P1_finalGrade > 0) { grades.push(+grade.P1_finalGrade); }
          break;

          case 2:
            if(grade.P2_finalGrade > 0) { grades.push(+grade.P2_finalGrade); }
          break;  

          case 3:
            if(grade.P3_finalGrade > 0) { grades.push(+grade.P3_finalGrade); }
          break;

          case 4:
            if(grade.P4_finalGrade > 0) { grades.push(+grade.P4_finalGrade); }
          break;
        }
      }
    });
    return grades.reduce((previous, current) => previous + current, 0 ) / grades.length;
  }

  getFinalAverageByStudent(idStudent) {
    let grades = [];
    let grade = 0.0;
    grade = this.getAverageByPeriod(1, idStudent);
    if(grade > 0) { grades.push(grade); }
    grade = this.getAverageByPeriod(2, idStudent);
    if(grade > 0) { grades.push(grade); }
    grade = this.getAverageByPeriod(3, idStudent);
    if(grade > 0) { grades.push(grade); }
    grade = this.getAverageByPeriod(4, idStudent);
    if(grade > 0) { grades.push(grade); }

    return grades.reduce((previous, current) => previous + current, 0 ) / grades.length;
  }

  getFinalAverageByMatter(idArea, idMatter, idStudent) {
    let grades = [];
    let grade = 0.0;
    grade = +this.getGradeNew(1, idArea, idMatter, idStudent);
    if(grade > 0) { grades.push(grade); }
    grade = +this.getGradeNew(2, idArea, idMatter, idStudent);
    if(grade > 0) { grades.push(grade); }
    grade = +this.getGradeNew(3, idArea, idMatter, idStudent);
    if(grade > 0) { grades.push(grade); }
    grade = +this.getGradeNew(4, idArea, idMatter, idStudent);
    if(grade > 0) { grades.push(grade); }

    return grades.reduce((previous, current) => previous + current, 0 ) / grades.length;
  }

  exportToExcel(): void
  {
    let date=new Date();
    let dateString = this.datepipe.transform(date,'yyyyMMdd');
    let element = document.getElementById('printReportObject');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    XLSX.writeFile(wb, dateString+'_'+this.selectedYear+'_'+this.getCourseName()+'_ResumenValorativo.xlsx'); 
  }

  getDate() {
    let date=new Date();
    let dateString = this.datepipe.transform(date,'yyyy/MMM/dd hh:mm a');
    return dateString;
  }

}
