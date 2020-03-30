import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { DirectorService } from '../services/director.service';

@Component({
  selector: 'app-school-information',
  templateUrl: './school-information.component.html',
  styleUrls: ['./school-information.component.css']
})
export class SchoolInformationComponent implements OnInit {

  configCrudComponent: any = {};
  directorCatalog: any = [];
  loadComponent: boolean = false;

  constructor(private crudService: CrudService, private directorService: DirectorService) {
    this.getDirectorList().then(result => {
      this.buildComponent();
    });
  }

  buildComponent() {
    this.configCrudComponent = {
      columns: [
        {
          name: 'name',
          title: 'Nombre',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Nombre de la institución.',
          helpText: 'Nombre de la institución.',
          defaultValue: '',
          catalog: null
        },
        {
          name: 'idDirector',
          title: 'Director',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'select',
          placeHolder: 'Seleccione el director.',
          helpText: 'Seleccione el director de la institución.',
          defaultValue: 0,
          catalog: this.directorCatalog
        }, 
        {
          name: 'address',
          title: 'Dirección',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Dirección principal del colegio.',
          helpText: 'Dirección principal del colegio.',
          defaultValue: '',
          catalog: null
        }, 
        {
          name: 'country',
          title: 'País',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Nombre del país.',
          helpText: 'Nombre del país.',
          defaultValue: '',
          catalog: null
        }, 
        {
          name: 'department',
          title: 'Departamento',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Nombre del departamento.',
          helpText: 'Nombre del departamento.',
          defaultValue: '',
          catalog: null
        }, 
        {
          name: 'city',
          title: 'Ciudad',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Nombre de la ciudad.',
          helpText: 'Nombre de la ciudad.',
          defaultValue: '',
          catalog: null
        }, 
        {
          name: 'webPage',
          title: 'Página Web',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Página de la institución.',
          helpText: 'Url de la página web de la institución.',
          defaultValue: '',
          catalog: null
        }, 
        {
          name: 'approval',
          title: 'Resolución',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Resolución institucional.',
          helpText: 'Texto que contiene la resolución institucional.',
          defaultValue: '',
          catalog: null
        }, 
        {
          name: 'urlLogoImage',
          title: 'Url Imagen Logo',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Dirección URL pública del logo.',
          helpText: 'Dirección URL pública del logo.',
          defaultValue: '',
          catalog: null
        }, 
        {
          name: 'urlCertificationImage',
          title: 'Url Imagen Certificación',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Dirección URL pública del certificado de calidad.',
          helpText: 'Dirección URL pública del certificado de calidad.',
          defaultValue: '',
          catalog: null
        }, 
        {
          name: 'telephone1',
          title: 'Teléfono 1',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: '(1) Número telefónico de la institución.',
          helpText: '(1) Número telefónico de la institución',
          defaultValue: '',
          catalog: null
        },{
          name: 'telephone1Description',
          title: 'Descripción Teléfono 1',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: '(1) Descripción del número telefónico de la institución.',
          helpText: '(1) Descripción del número telefónico de la institución',
          defaultValue: '',
          catalog: null
        },         
        {
          name: 'telephone2',
          title: 'Teléfono 2',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: '(2) Número telefónico de la institución.',
          helpText: '(2) Número telefónico de la institución',
          defaultValue: '',
          catalog: null
        },{
          name: 'telephone2Description',
          title: 'Descripción Teléfono 2',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: '(2) Descripción del número telefónico de la institución.',
          helpText: '(2) Descripción del número telefónico de la institución',
          defaultValue: '',
          catalog: null
        }, 
        {
          name: 'telephone3',
          title: 'Teléfono 3',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: '(3) Número telefónico de la institución.',
          helpText: '(3) Número telefónico de la institución',
          defaultValue: '',
          catalog: null
        },{
          name: 'telephone3Description',
          title: 'Descripción Teléfono 3',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: '(3) Descripción del número telefónico de la institución.',
          helpText: '(3) Descripción del número telefónico de la institución',
          defaultValue: '',
          catalog: null
        }, 
        {
          name: 'email1',
          title: 'Email 1',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: '(1) Email de la institución.',
          helpText: '(1) Email de la institución',
          defaultValue: '',
          catalog: null
        },{
          name: 'email1Description',
          title: 'Descripción Email 1',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: '(1) Descripción del Email de la institución.',
          helpText: '(1) Descripción del Email de la institución',
          defaultValue: '',
          catalog: null
        },         
        {
          name: 'email2',
          title: 'Email 2',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: '(2) Email de la institución.',
          helpText: '(2) Email de la institución',
          defaultValue: '',
          catalog: null
        },{
          name: 'email2Description',
          title: 'Descripción Email 2',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: '(2) Descripción del Email de la institución.',
          helpText: '(2) Descripción del Email de la institución',
          defaultValue: '',
          catalog: null
        }, 
        {
          name: 'email3',
          title: 'Email 3',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: '(3) Email de la institución.',
          helpText: '(3) Email de la institución',
          defaultValue: '',
          catalog: null
        },{
          name: 'email3Description',
          title: 'Descripción Email 3',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: '(3) Descripción del Email de la institución.',
          helpText: '(3) Descripción del Email de la institución',
          defaultValue: '',
          catalog: null
        }]
    };
    this.loadComponent = true;
  }

  async getDirectorList() {
    this.directorCatalog = await this.directorService.get();
  }

  ngOnInit() {
  }

}
