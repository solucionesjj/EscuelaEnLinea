import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { TeacherService } from '../services/teacher.service';
import { Router } from '@angular/router';
import { ComponentRegister } from '../component-register';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-academic-load',
  templateUrl: './academic-load.component.html',
  styleUrls: ['./academic-load.component.css']
})
export class AcademicLoadComponent implements OnInit {

  yearList: any = [];
  courseLists: any = [];
  teacherListCatalog: any = [];
  selectedCourse: string = '';
  selectedYear: number = 0;
  currentYear: number = (new Date()).getFullYear();
  range: number = 5;

  configCrudComponent: any = {};
  loadComponent: boolean = false;

  selectedTeacher: string;

  courseCatalog: any = [];
  matterCatalog: any = [];
  teacherCatalog: any = [];

  whereComponent: string;

  constructor(private crudService: CrudService, private teacherService: TeacherService, private router: Router, private courseService: CourseService ) {
    let initialYear: number = this.currentYear - this.range;
    const finalYear = initialYear + (this.range * 2);
    for (let actualYear = initialYear; actualYear <= finalYear; actualYear++) {
      this.yearList.push({ value: actualYear, text: actualYear });
    }
    this.selectedYear = this.currentYear;

    this.getTeacherList().then((value) => {
      this.getCourseList().then((value) => {
        this.getMatterList().then((value) => {
          this.loadCourses().then((value) => {
            this.buildComponent();
          });
        });
      });
    });
  }

  async loadCourses() {
    this.courseLists = [];
    const result = await this.courseService.getCourses(this.selectedYear.toString());
    if (result.length > 0) {
      result.forEach(course => { this.courseLists.push({ value: course.idCourse, text: course.course + ' - ' + course.reportCardModelName , idReportCardModel: course.idReportCardModel }) });
      this.courseLists.push({value: '0', text: ''});
      this.selectedCourse = '0';
    } else {
      this.courseLists.push({ value: '0', text: 'No se encontraron años para el curso actual.' })
    }
  }

 async loadTeachers (){
   this.teacherListCatalog = [];
    const sqlQuery = `select u.id as idTeacher, concat(u.name,' ',u.surname) as name
                      from AcademicLoads as al 
                      inner join Users as u
                        on u.id = al.idTeacher
                      where idCourse = `+this.selectedCourse+`
                      group by u.id, concat(u.name,' ',u.surname)
                      order by concat(u.name,' ',u.surname) asc`;
    this.crudService.model = 'Users';
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      for (const row of result.data) {
        this.teacherListCatalog.push({ id: row.idTeacher, value: row.name });
      }
    } else {
      alert('Error al consultar el catálogo de profesores del curso: '+this.selectedCourse);
    }
 }


  buildComponent() {
    this.configCrudComponent = {
      columns: [
        {
          name: 'idCourse',
          title: 'Curso',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'select',
          placeHolder: 'Seleccione el curso.',
          helpText: 'Seleccione el curso en el cual va a crear la carga académica.',
          defaultValue: '',
          catalog: this.courseCatalog
        },
        {
          name: 'idMatter',
          title: 'Materia',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'select',
          placeHolder: 'Seleccione la materia',
          helpText: 'Seleccione la materia que hará parte de la carga académica.',
          defaultValue: '',
          catalog: this.matterCatalog
        },
        {
          name: 'idTeacher',
          title: 'Profesor',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'select',
          placeHolder: 'Seleccione el profesor',
          helpText: 'Seleccione el profesor a cargo de la carga académica.',
          defaultValue: '',
          catalog: this.teacherCatalog
        },
        {
          name: 'hoursPerWeek',
          title: 'Horas por semana',
          titleAlignment: 'center',
          dataAlignment: 'center',
          htmlInputType: 'number',
          placeHolder: 'Cantidad de horas.',
          helpText: 'Coloque la cantidad de horas o intensidad por semana.',
          defaultValue: '1',
          catalog: null
        }]
    };
    this.loadComponent = true;
  }

  async getCourseList() {
    const sqlQuery = `select c.id as idCourse, 
                      concat(c.year,' - ',c.course) as course 
                      from Courses as c 
                      where year = year(curdate())
                      order by c.year desc, c.order asc`;
    this.crudService.model = 'Course';
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      for (const row of result.data) {
        this.courseCatalog.push({ id: row.idCourse, value: row.course });
      }
    } else {
      alert('Error al consultar el catálogo de cursos.')
      console.log(result)
    }

  }

  async getMatterList() {
    const sqlQuery = `select m.id as idMatter, 
                      a.area, 
                      m.matter  
                      from Areas as a 
                      inner join Matters as m 
                        on a.id = m.idArea 
                      order by a.area, m.matter`;
    this.crudService.model = 'Matter';
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      for (const row of result.data) {
        this.matterCatalog.push({ id: row.idMatter, value: row.area + ' - ' + row.matter });
      }
    } else {
      alert('Error al consultar el catálogo de materias.')
      console.log(result)
    }

  }

  async getTeacherList() {
    this.teacherCatalog = await this.teacherService.get();
  }

  filter() {
    if (this.selectedTeacher === '') {
      this.whereComponent = ``;
    } else {
      this.whereComponent = `{"where":{"idTeacher":"` + this.selectedTeacher + `","idCourse":"` + this.selectedCourse + `"}}`;
    }
  }

  recordOfGrades(eventInfo: any) {
    this.router.navigate(['app/recordofgrades/' + eventInfo.id]);
  }

  ngOnInit() {

  }
}
