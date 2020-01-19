import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {

  configCrudComponent: any = {};

  constructor() {

    this.configCrudComponent = {
      columns: [
        {
          name: 'parameter',
          title: 'Parámetro',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Nombre del parámetro',
          helpText: 'Coloque el nombre del parámetro.',
          defaultValue: ''
        },
        {
          name: 'value',
          title: 'Valor',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Valor del parámetro',
          helpText: 'Coloque el valor que tendrá del parámetro.',
          defaultValue: ''
        }
      ]
    };
  }

  ngOnInit() {
  }

}
