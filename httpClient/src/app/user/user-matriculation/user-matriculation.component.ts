import { CrudService } from './../../services/crud.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-user-matriculation',
  templateUrl: './user-matriculation.component.html',
  styleUrls: ['./user-matriculation.component.css']
})
export class UserMatriculationComponent implements OnInit {

  configCrudComponent: any = {};
  idStudent: any = '';
  coursesCatalog: any = [];
  whereComponent: string;
  selectedStudentInfo: any = {};

  constructor(private route: ActivatedRoute, private crudService: CrudService) {
    this.idStudent = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getCoursesCatalog();
    this.loadStudentInfo();
  }
  async loadStudentInfo() {
    const query = `select name, surname, identificationDocumentType, identificationDocument, gender, birthday from Users where Users.id = `+ this.idStudent;
    this.crudService.model = 'AcademicLoad';
    const result = await this.crudService.getDynamicQuery(query);
    if (result.result) {
      if (result.data.length > 0) {
        this.selectedStudentInfo = result.data[0];
      } else {
        console.log('No se encontraron datos.');
      }
    } else {
      console.log(result.message);
    }
  }

  // Metodo para configurar los atributos del componente Crud para las matriculas.

  setCrudAttributes() {
    this.whereComponent = `{"where":{"idStudent":"`+this.idStudent+`"}}`;
    this.configCrudComponent = {
      columns: [{
        name: 'date',
        title: 'Fecha Matricula',
        titleAlignment: 'center',
        dataAlignment: 'left',
        htmlInputType: 'date',
        placeHolder: 'Fecha Matrícula',
        helpText: 'Fecha en la que el estudiante se matrícula al curso.',
        defaultValue: ''
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
        name: 'idCourse',
        title: 'Curso',
        titleAlignment: 'center',
        dataAlignment: 'center',
        htmlInputType: 'select',
        placeHolder: 'Número de la matrícula.',
        helpText: 'Curso en el que se matriculará el estudiante.',
        defaultValue: '',
        catalog: this.coursesCatalog
      },
      {
        name: 'idStudent',
        title: 'Id Estudiante',
        titleAlignment: 'center',
        dataAlignment: 'center',
        htmlInputType: 'hidden',
        placeHolder: 'Id del estudiante.',
        helpText: '',
        defaultValue: this.idStudent,
        catalog: null
      },
      ]
    };
  }

  // Metodo para obtener el catalogo de cursos.

  /*
  async getCoursesCatalog() {
    this.crudService.model = 'Course';
    const result = await this.crudService.get();
    if (result.result) {
      this.coursesCatalog = result.data.map(m => ({ id: m.id, value: m.course }));
    }
    console.log(this.coursesCatalog);
    // Se llama el metodo de configuración del crud despues de obtener los catálogos.
    this.setCrudAttributes();
  }
  */

  async getCoursesCatalog() {
    const sqlQuery = `select c.id as idCourse, 
                      concat(c.year,' - ',c.course) as course 
                      from Courses as c 
                      order by c.year desc, c.order asc`;
    this.crudService.model = 'Course';
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      for (const row of result.data) {
        this.coursesCatalog.push({ id: row.idCourse, value: row.course });
      }
    } else {
      alert('Error al consultar el catálogo de cursos.')
      console.log(result)
    }
    console.log(this.coursesCatalog)
    this.setCrudAttributes();
  }

  async selectMatriculation(matriculation: any) {
    console.log(matriculation);
  }

}
