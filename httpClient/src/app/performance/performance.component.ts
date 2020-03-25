import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {

  loadCrudComponent: boolean;
  configCrudComponent: any = {};
  
    constructor() { 
      this.configCrudComponent = {
        columns: [
          {
            name: 'performance',
            title: 'Desempeño',
            titleAlignment: 'center',
            dataAlignment: 'left',
            htmlInputType: 'text',
            placeHolder: 'Nombre del desempeño.',
            helpText: 'Nombre del desempeño.',
            defaultValue: '',
            catalog: null
          },
          {
            name: 'from',
            title: 'Desde',
            titleAlignment: 'center',
            dataAlignment: 'right',
            htmlInputType: 'number',
            placeHolder: 'Valor mínimo.',
            helpText: 'Valor mínimo del desempeño.',
            defaultValue: 0,
            catalog: null
          },
          {
            name: 'to',
            title: 'Hasta',
            titleAlignment: 'center',
            dataAlignment: 'right',
            htmlInputType: 'number',
            placeHolder: 'Valor máximo.',
            helpText: 'Valor máximo del desempeño.',
            defaultValue: 0,
            catalog: null
          }
        ]};
        this.loadCrudComponent = true;
    }
  

  ngOnInit() {
  }

}
