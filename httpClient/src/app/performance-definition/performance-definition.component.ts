import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CrudService } from '../services/crud.service';
import { PeriodService } from '../services/period.service';

declare var $: any;
@Component({
  selector: 'app-performance-definition',
  templateUrl: './performance-definition.component.html',
  styleUrls: ['./performance-definition.component.css']
})
export class PerformanceDefinitionComponent implements OnInit {

  currentYear: number = (new Date()).getFullYear();
  selectedPeriod: string = '';
  selectedCourse: string = '';
  selectedMatter: string = '';

  idUser: string = '';
  isAdministrator: boolean = false;
  userGroups: any = [];

  courseLists: any = [];
  matterList: any = [];

  performanceDefinitionsData: any = [];

  loadComponent: boolean = false;

  constructor(private userService: UserService, private crudService: CrudService, private periodService: PeriodService) {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    this.idUser = user.id;
    this.courseLists.push({ value: '', text: '' })
    this.loadGroups().then(result => {
      this.loadCourses().then(result => {
        this.getActualPeriod().then(result => {
          this.loadComponent = true;
        });
      });
    })
  }

  async getActualPeriod() {
    this.selectedPeriod = await this.periodService.get();
  }

  async loadGroups() {
    this.userGroups = await this.userService.getUsertGroups(this.idUser);
    this.userGroups.forEach(group => {
      if (group.group == 'Administrador') {
        this.isAdministrator = true;
      }
    });
  }

  async loadMatters() {
    let sqlQuery = '';
    let whereIdUser = '';
    let whereIdCourse = '';

    if (!this.isAdministrator) {
      whereIdUser = ' and al.idTeacher = ' + this.idUser + ' ';
    }

    if (parseInt(this.selectedCourse) > 0) {
      whereIdCourse = ' and al.idCourse = ' + this.selectedCourse + ' ';
    }

    sqlQuery = `select a.id as idArea,
      m.id as idMatter,
      a.area,
      m.matter
      from AcademicLoads as al
      inner join Matters as m
        on m.id = al.idMatter
      inner join Areas as a
        on a.id = m.idArea
      inner join Courses as c
        on c.id = al.idCourse
      where c.year = `+ this.currentYear + ` 
      `+ whereIdUser + ` 
      `+ whereIdCourse + `
      group by a.id,m.id,a.area,m.matter
      order by a.order, m.matter`;

      this.matterList.push({ value: '', text: 'Todas' })

    this.crudService.model = 'Matter';
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      if (result.data.length > 0) {
        result.data.forEach(matter => {
          this.matterList.push({ value: matter.idMatter, text: matter.area + ' - '+ matter.matter })
        });
      }
    }

  }

  async loadCourses() {
    let sqlQuery = '';
    let whereIdUser = '';

    if (!this.isAdministrator) {
      whereIdUser = ' and al.idTeacher = ' + this.idUser;
    }

    sqlQuery = `select c.course, 
                      al.idCourse 
                  from Courses as c 
                  inner join AcademicLoads as al 
                    on c.id = al.idCourse 
                  where c.year = `+ this.currentYear + ` 
                  `+ whereIdUser + ` 
                  group by c.course, 
                      al.idCourse 
                  order by c.order`;

    this.crudService.model = 'Course';
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      if (result.data.length > 0) {
        result.data.forEach(course => {
          this.courseLists.push({ value: course.idCourse, text: course.course })
        });
      }
    }
  }

  async selectCourse() {
    this.selectedMatter = '';
    await this.loadMatters();
    if (parseInt(this.selectedCourse) > 0) {
      await this.loadPerformanceDefinitions();
    } else {
      console.log('Por favor seleccione un curso. Id actual: ' + parseInt(this.selectedCourse));
    }
  }

  async selectMatter() {
    await this.loadPerformanceDefinitions();
  }

  async savePerformanceDefinition(performanceDefinitionObject: any, item: any) {
    let description = '';
    let object = {};
    this.crudService.model = 'performanceDefinition';
    description = $('#' + item.id).val();

    if (description.length > 0) {

      if (performanceDefinitionObject.idPerformanceDefinition > 0) {
        object = {
          id: performanceDefinitionObject.idPerformanceDefinition,
          idAcademicLoad: performanceDefinitionObject.idAcademicLoad,
          idPerformance: performanceDefinitionObject.idPerformance,
          period: performanceDefinitionObject.period,
          description: description
        };
        const result = await this.crudService.update(object);
        if (result.result) {
          console.log('Registro actualizado exitosamente.')
        } else {
          alert('Error al guardar el registro.')
          console.log(result)
        }
      } else {
        object = {
          idAcademicLoad: performanceDefinitionObject.idAcademicLoad,
          idPerformance: performanceDefinitionObject.idPerformance,
          period: performanceDefinitionObject.period,
          description: description
        };
        const result = await this.crudService.add(object);
        if (result.result) {
          console.log('Registro creado exitosamente.')
        } else {
          alert('Error al guardar el registro.')
          console.log(result)
        }
      }
    } else {
      console.log('Debe colocar una descripción para el desempeño.')
    }
  }

  async loadPerformanceDefinitions() {
    let sqlQuery: string = '';

    let whereIdUser = '';
    let whereIdMatter = '';

    if (!this.isAdministrator) {
      whereIdUser = ' and al.idTeacher = ' + this.idUser + ' ';
    }

    if (parseInt(this.selectedMatter) > 0) {
      whereIdMatter = ' and al.idMatter = ' + this.selectedMatter + ' ';
    }


    sqlQuery = `select 
    c.id as idCourse,
    a.id as idArea,
    m.id as idMatter,
    u.id as idTeacher,
    c.course, 
    a.area, 
    m.matter, 
    concat(u.name,' ',u.surname) as teacher, 
    p.performance, 
    pd.id as idPerformanceDefinition, 
    al.id as idAcademicLoad,  
    p.id as idPerformance, 
    `+ this.selectedPeriod + ` as period, 
    pd.description 
  from Courses as c 
  inner join AcademicLoads as al 
   on c.id = al.idCourse 
  inner join Matters as m 
    on m.id = al.idMatter 
  inner join Areas as a 
    on a.id = m.idArea 
  inner join Users as u 
   on u.id = al.idTeacher 
  inner join Performances as p 
  left join performanceDefinitions as pd 
   on pd.idAcademicLoad = al.id 
   and pd.idPerformance = p.id 
   and pd.period = `+ this.selectedPeriod + ` 
  where c.year = `+ this.currentYear + ` 
    and c.id = `+ this.selectedCourse + ` 
    `+ whereIdMatter + `
    `+ whereIdUser + ` 
  order by c.order, a.order, m.matter,concat(u.name,' ',u.surname), p.from`;

    this.crudService.model = 'performanceDefinitions';
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      if (result.data.length > 0) {
        this.performanceDefinitionsData = result.data
      } else {
        this.performanceDefinitionsData = [];
      }
    }
  }

  ngOnInit() {
  }
}
