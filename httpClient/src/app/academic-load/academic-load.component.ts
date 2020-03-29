import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { TeacherService } from '../services/teacher.service';
import { Router } from '@angular/router';
import { ComponentRegister } from '../component-register';

@Component({
  selector: 'app-academic-load',
  templateUrl: './academic-load.component.html',
  styleUrls: ['./academic-load.component.css']
})
export class AcademicLoadComponent implements OnInit {

  configCrudComponent: any = {};
  loadComponent: boolean = false;

  selectedTeacher: string;

  courseCatalog: any = [];
  matterCatalog: any = [];
  teacherCatalog: any = [];

  whereComponent: string;

  constructor(private crudService: CrudService, private teacherService: TeacherService, private router: Router) {
    this.getTeacherList().then((value) => {
      this.getCourseList().then((value) => {
        this.getMatterList().then((value) => {
          this.buildComponent();
        });
      });
    });
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
                      c.course 
                      from Courses as c 
                      where active = 1 
                      order by c.order`;
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
      this.whereComponent = `{"where":{"idTeacher":"` + this.selectedTeacher + `"}}`;
    }
  }

  recordOfGrades(eventInfo: any) {
    this.router.navigate(['app/recordofgrades/' + eventInfo.id]);
  }

  ngOnInit() {

  }
}
