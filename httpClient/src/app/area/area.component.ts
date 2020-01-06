import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  configCrudComponent: any = {};

  constructor() {

    this.configCrudComponent = {
      columns: [{
        name: 'area',
        title: 'Area',
        titleAlignment: 'center',
        dataAlignment: 'left',
        htmlInputType: 'text',
        placeHolder: 'Nombre del área',
        helpText: 'Nombre con el cual se identifica el área. Servirá para agrupar las materias.',
        defaultValue: ''
      },
      {
        name: 'order',
        title: 'Orden',
        titleAlignment: 'center',
        dataAlignment: 'center',
        htmlInputType: 'number',
        placeHolder: 'Orden de visualización',
        helpText: 'Orden de visualización al momento de realizar informes.',
        defaultValue: '1'
      }]
    };
  }

  ngOnInit() {
  }
}
