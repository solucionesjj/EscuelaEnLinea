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

  constructor(private route: ActivatedRoute, private crudService: CrudService) {

    this.idStudent = this.route.snapshot.paramMap.get('id');


  }

  ngOnInit() {
    this.getCoursesCatalog();
  }

  // Metodo para configurar los atributos del componente Crud para las matriculas.

  setCrudAttributes() {
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
        htmlInputType: 'number',
        placeHolder: 'Número del folio',
        helpText: 'Número asociado al folio de la matrícula.',
        defaultValue: ''
      },
      {
        name: 'number',
        title: 'Número de Matrícula',
        titleAlignment: 'center',
        dataAlignment: 'right',
        htmlInputType: 'number',
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

  async selectMatriculation(matriculation: any) {
    console.log(matriculation);
  }

}
