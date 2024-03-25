import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aspects',
  templateUrl: './aspects.component.html',
  styleUrls: ['./aspects.component.css']
})
export class AspectsComponent implements OnInit {
  configCrudComponent: any = {};
  constructor() { }

  ngOnInit() {
    this.configCrudComponent = {
      columns: [
        {
          name: 'aspect',
          title: 'Aspecto',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Aspecto que agrupará las calificaciones para el acudiente.',
          helpText: 'Coloque un aspecto, que será el título para las calificaciones que se realizarán al acudiente, esta saldrá posteriormente en el boletín.',
          defaultValue: ''
        }
      ]
    };
  }

}
