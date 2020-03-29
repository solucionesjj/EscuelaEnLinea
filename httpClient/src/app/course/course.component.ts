import { Component, OnInit } from '@angular/core';
import { DirectorService } from '../services/director.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {

  actualYear: number = (new Date()).getFullYear();
  loadComponent: boolean = false;

  configCrudComponent: any = {};
  directorCatalog: any = [];

  // TODO Agregar director del curso, el director es un profesor
  constructor(private directorService: DirectorService) {
    this.getDirectorList().then(result => {
      this.buildComponent();
    });
  }

  buildComponent () {
    this.configCrudComponent = {
      columns: [{
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
        name: 'idDirector',
        title: 'Director',
        titleAlignment: 'center',
        dataAlignment: 'left',
        htmlInputType: 'select',
        placeHolder: 'Seleccione el director del curso.',
        helpText: 'Seleccione el director del curso.',
        defaultValue: 0,
        catalog: this.directorCatalog
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
    this.loadComponent = true;
    console.log(this.configCrudComponent)
  }

  async getDirectorList() {
    this.directorCatalog = await this.directorService.get();
  }

  ngOnInit() {
  }
}