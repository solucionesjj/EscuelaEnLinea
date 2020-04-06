import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { CourseService } from './course.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private crudService: CrudService, private courseService: CourseService, private userService: UserService) { }

  async getReportModelList() {
    let reportCardModelList: any = [];
    this.crudService.model = 'ReportCardModels';
    const sqlQuery = 'select id, name from ReportCardModels order by name';
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      result.data.forEach(model => {
        reportCardModelList.push({ id: model.id, value: model.name })
      });
    } else {
      alert('Error al consultar el listado de tipos de boletín.')
      console.log(result);
    }
    return reportCardModelList;
  }

  async getReport(idStudent: string, idCourse: string, period: string) {
    let report: string = '';
    report = report + await this.getSchoolInformationHtml();
    //report = report + '<br>';
    report = report + await this.getBasicInformation(idStudent, idCourse, period);
    //report = report + '<br>';
    report = report + await this.getAcademicLoad(idCourse, period, idStudent);
    report = report + '&nbsp;&nbsp;Observaciones del Director de grupo:';
    report = report + '<hr width="90%">';
    report = report + '<hr width="90%">';
    report = report + '<hr width="90%">';
    report = report + '<br>';
    report = report + '<br>';
    report = report + await this.getFooterInformation(idCourse);
    return idStudent + ' - ' + idCourse + ' - ' + period + '<br>' + report;
  }

  async  getFooterInformation(idCourse) {
    let html = '';
    let courseIdDirector = await this.courseService.getCourseInformation(idCourse);
    courseIdDirector = courseIdDirector.idDirector;
    let courseDirectorName = await this.userService.getUserInformation(courseIdDirector);
    courseDirectorName = courseDirectorName.CompleteName;
    let schoolDirectorName = await this.getSchoolInformation();
    schoolDirectorName = schoolDirectorName.directorName;
    html = `
    <table width="100%">
    <tr>
    <td width="50%" class="text-center"><hr width="80%"></td>
    <td width="50%" class="text-center"><hr width="80%"></td>
    </tr>
    <tr>
    <td width="50%" class="text-center">Rector: <b>`+ schoolDirectorName + `</b></td>
    <td width="50%" class="text-center">Director de grupo: <b>`+ courseDirectorName + `</b></td>
    </tr>    
    </table>
    `;
    return html;
  }

  async getBasicInformation(idStudent: string, idCourse: string, period: string) {
    let html = '';
    let studentName = await this.userService.getUserInformation(idStudent);
    studentName = studentName.CompleteName;
    let courseName = await this.courseService.getCourseInformation(idCourse);
    courseName = courseName.course;
    html = `<table width="100%">
            <tr>
            <td class="text-left" width="34%">&nbsp;&nbsp;Estudiante: <b>`+ studentName + `</b></td>
            <td class="text-center" width="33%">Curso: <b>`+ courseName + `</b></td>
            <td class="text-right" width="33%">Periodo: <b>`+ period + `&nbsp;&nbsp;</b></td>
            </tr>
            </table>`;
    return html;
  }

  async getSchoolInformationHtml() {
    let html: string = '';
    const schoolInformation = await this.getSchoolInformation();
    if (schoolInformation) {
      html = `
              <table width="100%">
              <tbody>
              <tr>
              <td class="text-center"><img src="`+ schoolInformation.urlLogoImage + `"></td>
              <td>
              <h4 class="text-center">`+ schoolInformation.name + `</h4>
              <h6 class="text-center">`+ schoolInformation.address + ` ` + schoolInformation.telephone1Description + `: ` + schoolInformation.telephone1 + `</h6>
              <h6 class="text-center">`+ schoolInformation.email1Description + `: ` + schoolInformation.email1 + `</h6>
              <h6 class="text-center">Página web: `+ schoolInformation.webPage + `</h6>
              <h6 class="text-center">`+ schoolInformation.approval + `</h6>
              <h6 class="text-center">`+ schoolInformation.country + ` - ` + schoolInformation.department + ` - ` + schoolInformation.city + `</h6>
              </td>
              <td class="text-center"><img src="`+ schoolInformation.urlCertificationImage + `"></td>
              </tr>
              </tbody>
              </table>
              `;
    } else {
      html = `<hr>No se ha definido la información de la institución.<hr>`;
    }
    return html;
  }

  async getSchoolInformation() {
    this.crudService.model = 'SchoolInformation';
    const sqlQuery = `	select si.name, 
    si.address,
    concat(u.name,' ',u.surname) as directorName, 
    si.webPage,
    si.approval,
    si.country,
    si.department,
    si.city,
    si.urlLogoImage,
    si.urlCertificationImage,
    si.telephone1,
    si.telephone1Description,
	  si.telephone2,
    si.telephone2Description,
  	si.telephone3,
    si.telephone3Description,
    si.email1,
    si.email1Description,
    si.email2,
    si.email2Description,
    si.email3,
    si.email3Description
    from SchoolInformations as si
    left join Users as u
    on u.id = si.idDirector`
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      return result.data[0];
    } else {
      alert('Error al consultar la información de la institución.')
      console.log(result);
      return {};
    }
  }


  async getAcademicLoad(idCourse: string, period: string, idStudent: string) {
    let html = '';
    const academicLoad = await this.courseService.getAcademicLoad(idCourse);

      if(academicLoad.length > 0) {
        for (let index = 0; index < academicLoad.length; index++) {
          let grade = await this.getGrade(academicLoad[index]['idAcademicLoad'], period, idStudent);
          let performanceDescription = await this.getPerformanceInformation(academicLoad[index].idAcademicLoad, period, grade);
          performanceDescription = performanceDescription.description;
          html= html + `
          <table width="100%" border="1" class="gradeData" >
          <tr class="BackgroundAreaMatterColor">
          <td width="80%" class="spaceBetweenData"><b>`+ academicLoad[index].area + ` - ` + academicLoad[index].matter + `</b></td>
          <td width="20%" class="spaceBetweenData text-center">Horas: `+ academicLoad[index].hoursPerWeek + `</td>
          </tr>
          <tr>
          <td colspan="2" class="spaceBetweenData"><b>Observaciones:</b><br>`+ performanceDescription + `</td>
          </tr>
          </table>
          `;
        }
      } else {
        html = 'No se encontró carga academica.'
      }
      console.log(html)
    return html;
  }

  async getGradeInformationModelOne() {
    let html = '';

  }


  async getGradeInformationModelTwo() {
    let html = '';

  }


  async getPerformanceInformation(idAcademicLoad: string, period: string, grade: number) {
    const sqlQuery = `select p.performance, 
                        pd.description 
                      from performanceDefinitions as pd 
                      inner join Performances as p
                        on pd.idPerformance = p.id 
                      where idAcademicLoad = `+ idAcademicLoad + `
                        and pd.period = `+ period + `
                        and `+ grade + ` between p.from and p.to
                    `;
    this.crudService.model = 'performanceDefinitions';
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      if (result.data.length > 0) {
        return { performance: result.data[0].performance, description: result.data[0].description };
      } else {
        return { performance: `Sin datos (` + grade + `)`, description: `Sin datos (` + grade + `)` };
      }
    } else {
      alert('Error al consultar la nota definitiva del periodo.')
      console.log(result)
    }
  }

  async getGrade(idAcademicLoad: string, period: string, idStudent: string) {
    const sqlQuery = `select AVG(gi.grade) as grade 
                        from GradeInformations as gi 
                        inner join GradeDefinitions as gd
                            on gi.idGradeDefinition = gd.id 
                        where gd.idAcademicLoad = `+ idAcademicLoad + `
                          and gi.period = `+ period + `
                          and gi.idStudent = `+ idStudent + `
                        group by gd.idAcademicLoad, gi.period, gi.idStudent
                      `;
    this.crudService.model = 'GradeInformations';
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result) {
      if (result.data.length > 0) {
        return result.data[0].grade;
      } else {
        return 0;
      }

    } else {
      alert('Error al consultar la nota definitiva del periodo.')
      console.log(result)
    }
  }

  /*
   getGeneralHeaderInformation () {
     //return object with basic header information
     //Student Name
     //Selected Course
     //Selected Perior
     //Possible Global Average
     //Possible position of student on his group
   }
 
   getStudentList(order) {
     //Possible order values = firstSurname or firstName
     //return an object with student id and student name
   }
 
   acumulatedAverage (idAcademicLoad,period,idStudent,)
 
   Courses
   AcademicLoads
   GradeDefinitions
   GradeInformations
      */
}
