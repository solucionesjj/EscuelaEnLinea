import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { UserService } from '../services/user.service';
import { PeriodService } from '../services/period.service';
import { AlertService } from '../services/alert.service';

declare var $: any;

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {

  selectedYear: number = 0;
  selectedCourse: string = '';
  selectedArea: string = '';
  selectedPeriod: string = '';
  selectedTeacher: string = '';
  selectedMatter: string = '';

  idUser: number = 0;

  range: number = 5;
  yearList: any = [];
  currentYear: number = (new Date()).getFullYear();

  loadComponent: boolean = false;

  courseLists: any = [];
  areaLists: any = [];
  matterLists: any = [];
  teacherLists: any = [];

  isAdministrator: boolean = false;

  idAcademicLoad: string;
  gradeDefinitionSelected: any = {};
  students: any = [];
  actualGrades: any = [];
  period: string;
  idCourse: string;
  grades: any = [];
  smallDateFormat: string;

  constructor(private alertService: AlertService, private crudService: CrudService, private userService: UserService, private periodService: PeriodService) {
    const user = this.userService.getLoggedUserInformation();
    this.idUser = user.id;

    let initialYear: number = this.currentYear - this.range;
    const finalYear = initialYear + (this.range * 2);
    for (let actualYear = initialYear; actualYear <= finalYear; actualYear++) {
      this.yearList.push({ value: actualYear, text: actualYear });
    }

    this.selectedYear = this.currentYear;

    this.loggedUserIsAdministrator().then(result => {
      this.loadTeachers().then(result => {
        this.getActualPeriod().then(result => {
          this.loadComponent = true;
        });
      });
    });
  }

  async loggedUserIsAdministrator() {
    this.isAdministrator = await this.userService.isAdministrator(this.idUser.toString());
  }

  async getActualPeriod() {
    this.selectedPeriod = await this.periodService.get();
  }

  async loadTeachers() {
    this.teacherLists = [];
    if (this.selectedYear > 0) {
      let sqlQuery = '';
      if (this.isAdministrator == true) {
        sqlQuery = `
            select u.id, u.name, u.surname        
            from AcademicLoads as al              
            inner join Users as u
            on u.id = al.idTeacher 
            inner join Courses as c
            on c.id = al.idCourse
            where c.year = `+ this.selectedYear + `
            group by u.id, u.name, u.surname 
            order by u.name, u.surname 
            `;
      } else {
        sqlQuery = `
            select u.id, u.name, u.surname        
            from AcademicLoads as al              
            inner join Users as u
            on u.id = al.idTeacher 
            inner join Courses as c
            on c.id = al.idCourse
            where c.year = `+ this.selectedYear + `
            and al.idTeacher = `+ this.idUser + `
            group by u.id, u.name, u.surname 
            order by u.name, u.surname 
            `;
      }

      this.crudService.model = 'User';
      const result = await this.crudService.getDynamicQuery(sqlQuery);
      if (result.result) {
        if (result.data.length > 0) {
          result.data.forEach(teacher => {
            this.teacherLists.push({ value: teacher.id, text: teacher.name + ' ' + teacher.surname });
          });
          this.teacherLists.unshift({ value: '0', text: 'Ninguno' });
          this.selectedTeacher = '0';
        } else {
          alert('No hay profesores para el año seleccionado.');
        }
      } else {
        alert('Error al consultar los profesores.');
        console.log(result);
      }
    } else {
      alert('Por favor seleccione un año.')
    }
  }

  async loadCourses() {
    this.courseLists = [];
    if (parseInt(this.selectedTeacher) > 0) {
      let sqlQuery = `
              select c.id, c.course
              from AcademicLoads as al              
              inner join Courses as c
              on c.id = al.idCourse
              where c.year = `+ this.selectedYear + `
              and al.idTeacher = `+ this.selectedTeacher + `
              group by c.id, c.course
              order by c.order      
             `;

      this.crudService.model = 'Course';
      const result = await this.crudService.getDynamicQuery(sqlQuery);
      if (result.result) {
        if (result.data.length > 0) {
          result.data.forEach(course => {
            this.courseLists.push({ value: course.id, text: course.course });
          });
          this.courseLists.unshift({ value: '0', text: 'Ninguno' });
          this.selectedCourse = '0';
        } else {
          alert('No hay cursos para el profesor seleccionado.');
        }
      } else {
        alert('Error al consultar los cursos.');
        console.log(result);
      }
    } else {
      alert('Por favor seleccione un profesor.')
    }
  }

  async loadAreas() {
    this.areaLists = [];
    if (parseInt(this.selectedCourse) > 0) {
      const sqlQuery = `
            select a.id, a.area 
            from AcademicLoads as al 
            inner join Matters as m 
              on m.id = al.idMatter 
            inner join Areas as a 
              on a.id = m.idArea 
            where al.idCourse = `+ this.selectedCourse + ` 
            and al.idTeacher = `+ this.selectedTeacher + `
            group by a.id, a.area 
            order by a.order 
            `;
      this.crudService.model = 'Area';
      const result = await this.crudService.getDynamicQuery(sqlQuery);
      if (result.result) {
        if (result.data.length > 0) {
          result.data.forEach(area => {
            this.areaLists.push({ value: area.id, text: area.area });
          });
          this.areaLists.unshift({ value: '0', text: 'Ninguno' });
          this.selectedArea = '0';
        } else {
          alert('No hay areas para el curso seleccionado.');
        }
      } else {
        alert('Error al consultar las areas.');
        console.log(result);
      }
    } else {
      alert('Por favor seleccione un curso.')
    }
  }

  async loadMatters() {
    this.matterLists = [];
    if (parseInt(this.selectedArea) > 0) {
      const sqlQuery = `
            select m.id, m.matter 
            from AcademicLoads as al  
            inner join Matters as m 
              on m.id = al.idMatter 
            inner join Areas as a 
              on a.id = m.idArea 
            where al.idCourse = `+ this.selectedCourse + `  
            and a.id = `+ this.selectedArea + `  
            and al.idTeacher = `+ this.selectedTeacher + ` 
            order by m.matter 
            `;
      this.crudService.model = 'Matter';
      const result = await this.crudService.getDynamicQuery(sqlQuery);
      if (result.result) {
        if (result.data.length > 0) {
          result.data.forEach(matter => {
            this.matterLists.push({ value: matter.id, text: matter.matter });
          });
          this.matterLists.unshift({ value: '0', text: 'Ninguno' });
          this.selectedMatter = '0';
        } else {
          alert('No hay materias para el área seleccionada.');
        }
      } else {
        alert('Error al consultar las materias.');
        console.log(result);
      }
    } else {
      alert('Por favor seleccione una materia.')
    }
  }

  async loadData() {
    this.loadAcademicLoadId().then(result => {
      if (parseInt(this.idAcademicLoad) > 0) {
        this.loadStudents().then(result => {
          this.loadGrades().then((value) => {
            this.loadActualGrades();
          })
        })
      } else {
        console.log('No se pueden cargar los datos porque no se ha encontrado la carga académica.')
      }
    })
  }

  async loadAcademicLoadId() {
    this.idAcademicLoad = '';
    if (parseInt(this.selectedTeacher) > 0) {
      if (parseInt(this.selectedCourse) > 0) {
        if (parseInt(this.selectedMatter) > 0) {
          const sqlQuery = ` 
          select al.id 
          from AcademicLoads as al 
          where al.idCourse = `+ this.selectedCourse + `
          and idMatter = `+ this.selectedMatter + `  
          and idTeacher = `+ this.selectedTeacher + `
          `;
          this.crudService.model = 'AcademicLoad';
          const result = await this.crudService.getDynamicQuery(sqlQuery);
          if (result.result) {
            this.idAcademicLoad = result.data[0].id;
          } else {
            alert('Error al consultar el id de la carga académica.')
          }
        } else {
          alert('Por favor seleccione la materia.')
        }
      } else {
        alert('Por favor seleccione el curso.')
      }
    } else {
      alert('Por favor seleccione el profesor.')
    }
  }

  async loadStudents() {
    this.students = [];
    const query = `select Users.id as idStudent,
    Users.name,
      Users.surname,
      Users.identificationDocument
  from Matriculations
  inner join Users
    on Matriculations.idStudent = Users.id
  where Matriculations.idCourse = `+ this.selectedCourse + `
  order by Users.surname, Users.name`;
    this.crudService.model = 'Matriculation';
    const result = await this.crudService.getDynamicQuery(query);
    if (result.result) {
      if (result.data) {
        this.students = result.data;
      } else {
        console.log('No se encontraron datos.');
      }
    } else {
      console.log(result.message);
    }
  }

  async loadGrades() {
    const query = `select 
        GradeDefinitions.id, 
        GradeDefinitions.grade, 
        GradeDefinitions.dueDate,
        GradeDefinitions.description, 
        GradeDefinitions.weight 
      from GradeDefinitions 
      where idAcademicLoad = `+ this.idAcademicLoad + `
        and period = `+ this.selectedPeriod + `
      order by dueDate asc`;
    this.crudService.model = 'GradeDefinition';
    const result = await this.crudService.getDynamicQuery(query);
    if (result.result) {
      if (result.data) {
        this.grades = result.data;
      } else {
        console.log('No se encontraron datos.');
      }
    } else {
      console.log(result.message);
    }
  }

  async loadActualGrades() {
    const query = `select GradeDefinitions.id as idGradeDefinitions,
    GradeInformations.idStudent,
    GradeInformations.grade,
    GradeInformations.id as idGradeInformations
    from AcademicLoads
    inner join GradeDefinitions
      on GradeDefinitions.idAcademicLoad = AcademicLoads.id
    inner join GradeInformations
      on GradeInformations.idGradeDefinition = GradeDefinitions.id
    where AcademicLoads.id = `+ this.idAcademicLoad + `
        and GradeDefinitions.period = `+ this.selectedPeriod;
    this.crudService.model = 'GradeDefinition';
    const result = await this.crudService.getDynamicQuery(query);
    if (result.result) {
      if (result.data) {
        this.actualGrades = result.data;
      } else {
        console.log('No se encontraron datos.');
      }
    } else {
      console.log(result.message);
    }
  }

  getAverage(idStudent: number) {
    let sumOfGrades: number = 0;
    let gradesCount: number = 0;
    let average = 0;
    this.actualGrades.forEach(gradeInformation => {
      if (gradeInformation.idStudent === idStudent) {
        gradesCount++;
        sumOfGrades = sumOfGrades + parseFloat(gradeInformation.grade);
      }
    });
    if (gradesCount > 0) {
      average = sumOfGrades / gradesCount;
    }
    return average.toFixed(2);
  }

  async applyGrade(idGradeDefinition: number, idStudent: number, grade: number) {
    if (grade) {
      if (grade >= 0 && grade <= 5) {
        let idGradeInformation = 0;
        let gradeInformation: any = {};
        let result: any = {};
        this.crudService.model = 'GradeInformation'

        gradeInformation.idGradeDefinition = idGradeDefinition;
        gradeInformation.idStudent = idStudent;
        gradeInformation.period = this.selectedPeriod;
        gradeInformation.grade = grade;
        idGradeInformation = this.getActualIdGradeInformation(idGradeDefinition, idStudent);
        // Grade exists, update it
        if (idGradeInformation > 0) {
          if (grade == 0) {
            let gradeInformationToDelete: any = { id: idGradeInformation };
            result = await this.crudService.delete(gradeInformationToDelete);
            if (result.result) {
              this.alertService.success(result.message)
            } else {
              this.alertService.danger(result.message)
            }
          } else {
            gradeInformation.id = idGradeInformation;
            result = await this.crudService.update(gradeInformation);
            if (result.result) {
              this.alertService.success(result.message)
            } else {
              this.alertService.danger(result.message)
            }
          }
        } else {
          if (grade > 0) {
            // Grade not exists, insert it
            result = await this.crudService.add(gradeInformation);
            console.log(result)
            if (result.result) {
              this.alertService.success(result.message)
            } else {
              this.alertService.danger(result.message)
            }
          } else {
            this.alertService.warning('No se puede crear una nota en cero (0).')
          }

        }

        this.loadActualGrades().then((value) => {
          let htmlObject = '#averageStudent_' + idStudent;
          let average = this.getAverage(idStudent)
          $(htmlObject).val(average);
        });
      } else {
        this.alertService.warning('La nota debe ser un número entre 0 y 5.')
      }
    }
  }

  getActualIdGradeInformation(idGradeDefinitions: number, idStudent: number): number {
    let idGradeInformations = 0;
    this.actualGrades.forEach(gradeInformation => {
      if (gradeInformation.idGradeDefinitions === idGradeDefinitions) {
        if (gradeInformation.idStudent === idStudent) {
          idGradeInformations = gradeInformation.idGradeInformations;
        }
      }
    });
    return idGradeInformations;
  }

  getActualGrade(idGradeDefinitions: number, idStudent: number): number {
    let grade;
    this.actualGrades.forEach(gradeInformation => {
      if (gradeInformation.idGradeDefinitions === idGradeDefinitions) {
        if (gradeInformation.idStudent === idStudent) {
          grade = gradeInformation.grade
        }
      }
    });
    return grade;
  }



  ngOnInit() {
  }

}


/*
async loadAcademicLoadInfo() {
  const query = `select
  Users.name,
  Users.surname,
  Courses.year,
  Courses.course,
  Courses.id as idCourse,
  Areas.area,
  Matters.matter,
  AcademicLoads.hoursPerWeek
from AcademicLoads
inner join Courses
  on AcademicLoads.idCourse = Courses.id
inner join Matters
  on AcademicLoads.idMatter = Matters.id
inner join Areas
  on Matters.idArea = Areas.id
inner join Users
  on AcademicLoads.idTeacher = Users.id
where AcademicLoads.id = `+ this.idAcademicLoad;
  this.crudService.model = 'AcademicLoad';
  const result = await this.crudService.getDynamicQuery(query);
  if (result.result) {
    if (result.data) {
      this.gradeDefinitionSelected = result.data[0];
    } else {
      console.log('No se encontraron datos.');
    }
  } else {
    console.log(result.message);
  }
}
*/