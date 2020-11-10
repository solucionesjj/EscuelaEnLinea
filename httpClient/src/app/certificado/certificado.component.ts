import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { CourseService } from '../services/course.service';
import { RadicadorValoracionesFinalesService } from '../services/radicador-valoraciones-finales.service';
import { ReportService } from '../services/report.service';
import { SchoolService } from '../services/school.service';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {

  data: any = [];
  schoolData: any = {};
  selectedYear: number = 0;
  currentYear: number = (new Date()).getFullYear();
  range: number = 5;
  yearList: any = [];
  students: any = [];
  courseLists: any = [];
  selectedCourse: string = '';
  selectedCourseName: string = '';
  courseDirectorName: string = '';
  today: number = Date.now();

  constructor(private reportService: ReportService, private schoolSevice: SchoolService, private alertService: AlertService, private courseService: CourseService, private radicadorValoracionesFinalesService: RadicadorValoracionesFinalesService) {
    let initialYear: number = this.currentYear - this.range;
    const finalYear = initialYear + (this.range * 2);
    for (let actualYear = initialYear; actualYear <= finalYear; actualYear++) {
      this.yearList.push({ value: actualYear, text: actualYear });
    }
    this.selectedYear = this.currentYear;
    this.loadCourses();
    this.getSchoolInformation();
  }


  getSelectedCourseName() {
    this.selectedCourseName = '';
    this.courseLists.forEach(course => {
      if (course.value == parseInt(this.selectedCourse)) {
        this.selectedCourseName = course.text;
      }
    });
  }

  async getSelectedCourseDirectorName() {
    this.courseDirectorName = '';
    const result = await this.courseService.getDirectorName(parseInt(this.selectedCourse));
    this.courseDirectorName = result.name;
  }

  ngOnInit() {
  }

  async getSchoolInformation() {
    const data = await this.schoolSevice.getSchoolInformation();
    if (data) {
      this.schoolData = data;
    } else {
      this.schoolData = { directorIdentification: "Sin información:", directorName: "Sin información", schoolName: "Sin información" };
    }
  }

  selectYear() {
    this.loadCourses();
  }

  async loadCourses() {
    this.courseLists = [];
    if (this.selectedYear > 0) {
      const result = await this.courseService.getCourses(this.selectedYear.toString());
      if (result.length > 0) {
        this.courseLists.push({ value: '0', text: '' })
        result.forEach(course => { this.courseLists.push({ value: course.idCourse, text: course.course }) });
      } else {
        this.courseLists.push({ value: '0', text: 'No se encontraron años para el curso actual.' })
      }
    } else {
      this.alertService.warning("Por favor seleccione un año.")
    }
  }

  promotionDecision(studentName: string) {
    var notesCount: number = 0;
    var notes: number = 0;
    this.students.forEach(student => {
      if (student.name == studentName) {
        student.data.forEach(studentData => {
          notes += parseFloat(studentData.finalGrade);
          notesCount++;
        });
      }
    });
    /// determina el promedio
    if ((notes / notesCount) > 3) {
      return true;
    } else {
      return false;
    }
  }

  async getRadicadorValoracionesFinalesData() {
    this.students = [];
    this.data = {};
    if (parseInt(this.selectedCourse) > 0) {
      this.getSelectedCourseName();
      this.getSelectedCourseDirectorName();
      const result = await this.radicadorValoracionesFinalesService.getRadicadorValoracionesFinalesData(parseInt(this.selectedCourse));
      if (result.length > 0) {
        this.students = result.filter((value, index, self) => self.map(x => x.name).indexOf(value.name) === index).map(item => ({ name: item.name, data: [] }))
        this.students.forEach(student => {
          student.data = result.filter(f => f.name == student.name)
        });
      } else {
        this.alertService.warning("No se encontraron datos.")
      }
    } else {
      this.alertService.warning("Por favor seleccione un curso.")
    }
  }

}