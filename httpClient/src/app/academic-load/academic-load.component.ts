import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

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

  constructor(private crudService: CrudService) {
    this.getCourseList();
    this.getMatterList();
    this.getTeacherList();

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

  // TODO Pendiente listar solo usuarios tipo Profesor
  async getTeacherList() {
    this.crudService.model = 'User';
    const query = `select Users.id, Users.name, Users.surname from UserGroups inner join Users on Users.id = UserGroups.idUser inner join Groups on Groups.id = UserGroups.idGroup where Groups.group = 'Profesor'`;
    const result = await this.crudService.getDynamicQuery(query);
    this.teacherCatalog.push({ id: '', value: 'Todos' });
    for (const row of result.data) {
      this.teacherCatalog.push({ id: row.id, value: row.name + ' ' + row.surname });
    }
  }

  filter() {
    if (this.selectedTeacher === '') {
      this.whereComponent = ``;
    } else {
      this.whereComponent = `{"where":{"idTeacher":"` + this.selectedTeacher + `"}}`;
    }
  }

  ngOnInit() {
  }
}
