import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  configCrudComponent: any = {};
  sectionsCatalog: any = [];
  visibleCatalog: any = [];
  loadCrudComponent: boolean;

  constructor(private crudService: CrudService) {
    this.loadCrudComponent = false;
    this.visibleCatalog = [
      { id: '0', value: '' },
      { id: '1', value: 'Si' },
      { id: '0', value: 'No' }
    ];
    this.loadSections();
  }

  async loadSections() {
    this.crudService.model = 'Section';
    const result = await this.crudService.get();
    console.log(result)
    if (result.result) {
      result.data.forEach(item => { this.sectionsCatalog.push({ id: item.id, value: item.section }) });
    }

    this.loadComponent();
  }

  loadComponent() {
    this.configCrudComponent = {
      columns: [
        {
          name: 'idSection',
          title: 'Sección',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'select',
          placeHolder: 'Nombre de la sección en el menú.',
          helpText: 'Nombre de la sección en el menú ',
          defaultValue: '',
          catalog: this.sectionsCatalog
        },
        {
          name: 'component',
          title: 'Componente',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Nombre técnico del componente',
          helpText: 'Nombre técnico que el desarrollador colocó al componente',
          defaultValue: '',
          catalog: null
        },
        {
          name: 'action',
          title: 'Acción',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Nombre de la acción específica.',
          helpText: 'Nombre de la acción específica que el desarrollador colocó dentro del componente.',
          defaultValue: ''
        },
        {
          name: 'menuTitle',
          title: 'Título',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Título del componente',
          helpText: 'Título como se visualizará en el menú.',
          defaultValue: ''
        },
        {
          name: 'description',
          title: 'Descripción',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Descripción del módulo o de la acción.',
          helpText: 'Descripción del módulo o de la acción que servirá para orientar al usuario.',
          defaultValue: ''
        },
        {
          name: 'showInMenu',
          title: 'Mostrar en menú',
          titleAlignment: 'center',
          dataAlignment: 'center',
          htmlInputType: 'select',
          placeHolder: 'Si se mostrará o no en el menú.',
          helpText: 'Si se mostrará o no en el menú.',
          defaultValue: 0,
          catalog: this.visibleCatalog
        },
        {
          name: 'menuOrder',
          title: 'Orden',
          titleAlignment: 'center',
          dataAlignment: 'center',
          htmlInputType: 'number',
          placeHolder: 'Orden como se visualizará en el .',
          helpText: 'Nombre de la acción específica que el desarrollador colocó dentro del componente.',
          defaultValue: 0
        },
        {
          name: 'routerLink',
          title: 'Router Link',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Ruta para la apertura del módulo.',
          helpText: 'Ruta que el desarrollador colocó para la apertura del módulo.',
          defaultValue: ''
        },
        {
          name: 'icon',
          title: 'Icono',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Nombre del icono.',
          helpText: 'Nombre del icono a utilizar.',
          defaultValue: 'mdi mdi-duck',
          catalog: null
        }
      ]
    };
    this.loadCrudComponent = true;
  }

  ngOnInit() {
  }

}
