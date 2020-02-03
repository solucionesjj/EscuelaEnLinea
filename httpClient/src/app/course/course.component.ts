import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {

  configCrudComponent: any = {};

  actualYear: number;

  // TODO Agregar director del curso, el director es un profesor
  constructor() {

    this.actualYear = (new Date()).getFullYear();

    this.configCrudComponent = {
      columns: [{
        name: 'course',
        title: 'Curso',
        titleAlignment: 'center',
        dataAlignment: 'left',
        htmlInputType: 'text',
        placeHolder: 'Nombre del curso',
        helpText: 'Nombre con el cual se identifica el curso.',
        defaultValue: ''
      },
      {
        name: 'year',
        title: 'Año',
        titleAlignment: 'center',
        dataAlignment: 'center',
        htmlInputType: 'number',
        placeHolder: 'Año en formato 0000',
        helpText: 'Año al cual pertenece el curso.',
        defaultValue: this.actualYear
      },
      {
        name: 'order',
        title: 'Orden',
        titleAlignment: 'center',
        dataAlignment: 'center',
        htmlInputType: 'number',
        placeHolder: 'Orden del curso',
        helpText: 'Orden con el cual se se visualiza el curso.',
        defaultValue: '1'
      },
      {
        name: 'active',
        title: 'Activo',
        titleAlignment: 'center',
        dataAlignment: 'center',
        htmlInputType: 'checkbox',
        placeHolder: 'Si se encuentra activo o no.',
        helpText: 'Si se encuentra activo o no. Si está inactivo no se visualiza.',
        defaultValue: '1'
      }]
    };
  }

  ngOnInit() {
  }
}