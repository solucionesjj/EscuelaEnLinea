import { Component } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {

  whereComponent: string;
  configCrudComponent: any = {};
  idCourse: string;
  coursesCatalog: any = [];
  students: any = [];
  course: any = {};
  informationLoaded: boolean;
  courseInformationLoaded: boolean;
  studentsInformationLoaded: boolean;

  constructor(private crudService: CrudService, private route: ActivatedRoute, private courseService: CourseService) {

    this.idCourse = this.route.snapshot.paramMap.get('id');

    this.getCourseInfo()
      .then((course) => { this.courseInformationLoaded = true; this.loadComponent(); })
      .catch((course) => { this.courseInformationLoaded = false; console.log(course) });

    this.loadStudents()
      .then((students) => { this.studentsInformationLoaded = true; this.loadComponent(); })
      .catch((students) => { this.studentsInformationLoaded = false; console.log(students) })
  }

  async getCourseInfo() {
    const searchCriteria = `{"where":{"id":"` + this.idCourse + `"}}`;
    this.crudService.model = 'Course';
    const result = await this.crudService.getSearch(searchCriteria);
    if (result.result) {
      if (result.data) {
        this.course.id = result.data[0].id;
        this.course.course = result.data[0].course;
        this.course.year = result.data[0].year;
        this.course.active = result.data[0].active;
        this.coursesCatalog.push({ id: this.course.id, value: this.course.year +' - '+this.course.course });
      }
    } else {
      console.log(result.message);
    }
  }

  async loadStudents() {
    this.students = []
    const result = await this.courseService.getStudentsOrderBySurname(this.idCourse);
    this.students = result.map((record) => { return { id: record.idStudent, value: record.fullName + ' - ' + record.identificationDocument }; });
  }

  loadComponent() {
    if (this.courseInformationLoaded && this.studentsInformationLoaded) {
      this.informationLoaded = true;

      this.whereComponent = `{"where":{"idCourse":"` + this.idCourse + `"}}`;

      this.configCrudComponent = {
        columns: [
          {
            name: 'idCourse',
            title: 'Curso',
            titleAlignment: 'center',
            dataAlignment: 'center',
            htmlInputType: 'select',
            placeHolder: 'Curso en el que se matriculará el estudiante.',
            helpText: 'Curso en el que se matriculará el estudiante.',
            defaultValue: this.idCourse,
            catalog: this.coursesCatalog
          },
          {
            name: 'idStudent',
            title: 'Estudiante',
            titleAlignment: 'center',
            dataAlignment: 'left',
            htmlInputType: 'select',
            placeHolder: 'Id del estudiante.',
            helpText: 'Seleccione el estudiante',
            defaultValue: '',
            catalog: this.students
          },
          {
            name: 'sheet',
            title: 'Folio',
            titleAlignment: 'center',
            dataAlignment: 'right',
            htmlInputType: 'text',
            placeHolder: 'Número del folio',
            helpText: 'Número asociado al folio de la matrícula.',
            defaultValue: ''
          },
          {
            name: 'number',
            title: 'Número de Matrícula',
            titleAlignment: 'center',
            dataAlignment: 'right',
            htmlInputType: 'text',
            placeHolder: 'Número de la matrícula.',
            helpText: 'Número asociado a la matrícula.',
            defaultValue: ''
          },
          {
            name: 'date',
            title: 'Fecha Matricula',
            titleAlignment: 'center',
            dataAlignment: 'left',
            htmlInputType: 'date',
            placeHolder: 'Fecha Matrícula',
            helpText: 'Fecha en la que el estudiante se matrícula al curso.',
            defaultValue: ''
          },
        ]
      };

    }
  }
}
