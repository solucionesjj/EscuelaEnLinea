import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
loadCrudComponent: boolean;
configCrudComponent: any = {};

  constructor() { 
    this.configCrudComponent = {
      columns: [
        {
          name: 'section',
          title: 'Sección',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Nombre de la sección en el menú.',
          helpText: 'Nombre de la sección en el menú ',
          defaultValue: '',
          catalog: null
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
        },
        {
          name: 'order',
          title: 'Orden',
          titleAlignment: 'center',
          dataAlignment: 'center',
          htmlInputType: 'number',
          placeHolder: 'Orden de visualización.',
          helpText: 'Orden de visualización en el menú.',
          defaultValue: 0,
          catalog: null
        }
      ]};
      this.loadCrudComponent = true;
  }

  ngOnInit() {
  }

}
