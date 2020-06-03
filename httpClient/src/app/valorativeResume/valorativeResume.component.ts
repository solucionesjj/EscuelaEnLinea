import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-valorativeResume',
  templateUrl: './valorativeResume.component.html',
  styleUrls: ['./valorativeResume.component.css']
})
export class ValorativeResumeComponent implements OnInit {

  matterList: any = [];
  studentList: any = [];
  valorativeData: any = [];
  idCourse: number;

  selectedYear: number = 0;
  range: number = 5;
  yearList: any = [];
  currentYear: number = (new Date()).getFullYear();

  courseLists: any = [];

  selectedCourse: string = '0';

  showData: boolean = false;

  constructor(private crudService: CrudService, private courseService: CourseService) {
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

  loadValorativeResumen () {
    this.showData = false;
    this.idCourse = parseInt(this.selectedCourse);
    this.getMattersOfCourse(this.idCourse).then(result => {
      this.getStundetsFromCourse(this.idCourse).then(result => {
        this.getValorativeData(this.idCourse).then(result => {
          this.showData = true;
        })
      });
    });
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

  async getStundetsFromCourse(course: number) {
    this.studentList = [];
    const result: any = await this.courseService.getStudentsOrderBySurname(this.idCourse.toString());
    if (result.length > 0) {
      result.forEach(student => {
        for (let index = 1; index <= 5; index++) {
          this.studentList.push({ idStudent: student.idStudent, name: student.surname + ' ' + student.name , period: index});          
        }
        
      });
    } else {
      alert('No se encontraron alumnos en el curso seleccionado.')
      console.log(result);
    }

  }

  async getMattersOfCourse(idCourse: number) {
    this.matterList = [];
    let sqlQuery = '';

    if (idCourse > 0) {
      sqlQuery = `select al.idMatter, a.area ,m.matter
      from AcademicLoads as al 
      inner join Matters as m
       on m.id = al.idMatter 
      inner join Areas as a
       on a.id = m.idArea 
      where al.idCourse = `+ idCourse + `
      order by a.order, m.matter`;

      this.crudService.model = 'Matter';
      const result = await this.crudService.getDynamicQuery(sqlQuery);
      if (result.result) {
        if (result.data.length > 0) {
          result.data.forEach(matter => {
            this.matterList.push({ idMatter: matter.idMatter, area: matter.area, matter: matter.matter })
          });
        }
      }
    } else {
      alert('No se puede consultar las materias porque no ha seleccionado un curso.')
      console.log(idCourse);
    }
  }

  async getValorativeData(idCourse: number) {
    this.valorativeData = [];
    let sqlQuery = '';

    if (idCourse > 0) {
      sqlQuery = `call getValorativeResume(` + idCourse + `)`;
      this.crudService.model = 'Matter';
      const result = await this.crudService.getDynamicQuery(sqlQuery);
      if (result.result) {
        if (result.data.length > 0) {
          for (const key in result.data[0]) {
            this.valorativeData.push(result.data[0][key]);
          }
        } else {
          alert('No se encontraron datos para el informe valorativo.')
          console.log(result);
        }
      } else {
        alert('Se presentó error al consultar la información del informe valorativo.')
        console.log(result);
      }
    } else {
      alert('Por favor seleccione un curso para consultar la información del informe valorativo.')
      console.log(idCourse);
    }
  }

  getGeneralAverageByPeriod(idStudent:number,period:number):string {
    let generalAverage:string = '';
    this.valorativeData.forEach(record => {
      if(record.idStudent == idStudent && record.period == period) {
        generalAverage = record.generalAverage;
      }
    });
    return generalAverage;
  }

  getAverageByMatterAndPeriod(idStudent:number,idMatter:number,period:number):string {
    let generalAverage:string = '';
    this.valorativeData.forEach(record => {
      if(record.idStudent == idStudent && record.period == period) {
        for (const key in record) {
          if(key == idMatter.toString()) {
            generalAverage = record[key];
            return generalAverage;
          }
        }
      }
    });
    return generalAverage;
  }


}
