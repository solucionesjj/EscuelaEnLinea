import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private crudService: CrudService, private userService: UserService) { }

  async getStudentsOrderByName(idCourse: string) {
    return this.getStudents(idCourse, 1);
  }

  async getStudentsOrderBySurname(idCourse: string) {
    return this.getStudents(idCourse, 2);
  }

  async getStudentsOrderByIdentification(idCourse: string) {
    return this.getStudents(idCourse, 3);
  }

  private async getStudents(idCourse: string, order: number) {
    let students = [];
    let orderCriteria: string = '';
    let fullName: string = '';
    switch (order) {
      case 1:
        orderCriteria = ` order by Users.name, Users.surname `;
        fullName = ` concat(Users.name,' ',Users.surname) `
        break;
      case 2:
        orderCriteria = ` order by Users.surname, Users.name `;
        fullName = ` concat(Users.surname,' ',Users.name) `
        break;
      case 3:
        orderCriteria = ` order by Users.identificationDocument `;
        fullName = ` concat(Users.name,' ',Users.surname) `
        break;
      default:
        orderCriteria = ` order by Users.name, Users.surname `;
        fullName = ` concat(Users.name,' ',Users.surname) `
        break;
    }

    const query = `select Users.id as idStudent,
                      Users.name,
                      `+ fullName + ` as fullName,
                      Users.surname,                      
                      Users.identificationDocument
                    from Matriculations
                      inner join Users
                      on Matriculations.idStudent = Users.id
                    where Matriculations.idCourse = `+ idCourse + `
                    `+ orderCriteria;
    this.crudService.model = 'Matriculation';
    const result = await this.crudService.getDynamicQuery(query);
    if (result.result) {
      if (result.data) {
        students = result.data;
      } else {
        console.log('No se encontraron datos.');
      }
    } else {
      console.log(result.message);
    }
    return students;
  }

  async getCourses(year: string) {
    let sqlQuery = '';
    let whereIdUser = '';
    const user = this.userService.getLoggedUserInformation();
    const isAdministrator = await this.userService.isAdministrator(user.id);

    if (isAdministrator == false) {
      whereIdUser = ' and al.idTeacher = ' + user.id;
    }

    sqlQuery = `select c.course, 
                      c.id as idCourse,
                      c.year,
                      c.idReportCardModel,
                      rm.name as reportCardModelName
                  from Courses as c 
                  inner join AcademicLoads as al 
                    on c.id = al.idCourse 
                  left join ReportCardModels as rm
                    on c.idReportCardModel = rm.id
                  where c.year = `+ year + ` 
                  `+ whereIdUser + ` 
                  and c.active = 1
                  group by c.course, 
                      c.id ,
                      c.year,
                      c.idReportCardModel,
                      rm.name
                  order by c.order`;

    this.crudService.model = 'Course';
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      return result.data;
    } else {
      alert('Error al consultar los cursos.')
      console.log(result)
    }
  }

  async getAllCourses(year: string) {
    const sqlQuery = `select c.course, 
                        c.idCourse,
                        c.year,
                        c.idReportCardModel,
                        rm.name as reportCardModelName
                    from Courses as c 
                    left join ReportCardModels as rm
                      on c.idReportCardModel = rm.id
                    where c.year = `+ year + ` 
                    and c.active = 1
                    group by c.course, 
                        c.idCourse ,
                        c.year,
                        c.idReportCardModel,
                        rm.name
                    order by c.order`;

    this.crudService.model = 'Course';
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      return result.data;
    } else {
      alert('Error al consultar los cursos.')
      console.log(result)
    }
  }

  async getCourseInformation(idCourse: string) {
    this.crudService.model = "Course";
    const searchCriteria = `{"where":{"id":"` + idCourse + `"}}`;
    const result = await this.crudService.getSearch(searchCriteria);
    if (result.result) {
      return result.data[0];
    } else {
      alert('Error al consultar la información del curso.')
      console.log(result)
    }
  }

  async getAcademicLoad(idCourse: string) {
    let sqlQuery = `Select a.area, 
                      m.matter, 
                      al.hoursPerWeek, 
                      al.id as idAcademicLoad
                    from AcademicLoads as al
                    inner join Matriculations as mt
                      on mt.idCourse = al.idCourse 
                    inner join Matters as m
                      on al.idMatter = m.id 
                    inner join Areas as a 
                      on a.id = m.idArea 
                    where al.idCourse = `+ idCourse + `
                    group by a.area, m.matter, al.hoursPerWeek, al.id
                    order by a.order, m.matter `;
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      return result.data;
    } else {
      alert('Error al consultar la carga académica del curso.')
      console.log(result)
    }
  }
}
