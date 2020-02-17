import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { TeacherService } from '../services/teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-academic-load',
  templateUrl: './academic-load.component.html',
  styleUrls: ['./academic-load.component.css']
})
export class AcademicLoadComponent implements OnInit {

  configCrudComponent: any = {};
  courseCatalog: any = [];
  matterCatalog: any = [];
  teacherCatalog: any = [];
  selectedTeacher: string;
  whereComponent: string;
  loadComponent:boolean;

  constructor(private crudService: CrudService, private teacherService: TeacherService, private router: Router) {
    this.loadComponent = false;
    this.getTeacherList().then((value) => { 
      this.loadComponent = true;
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
  
    
    });
    this.getCourseList();
    this.getMatterList();

   
  }

  // TODO Ordenar el listado por el orden del curso
  async getCourseList() {
    this.crudService.model = 'Course';
    const result = await this.crudService.get();
    for (const row of result.data) {
      this.courseCatalog.push({ id: row.id, value: row.course });
    }
  }

  // TODO Pendiente colocar el nombre del área
  // TODO ordenar por área y luego por materia
  async getMatterList() {
    this.crudService.model = 'Matter';
    const result = await this.crudService.get();
    for (const row of result.data) {
      this.matterCatalog.push({ id: row.id, value: row.matter });
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
