import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  configCrudComponent: any = {};

  constructor() {

    this.configCrudComponent = {
      columns: [{
        name: 'group',
        title: 'Grupo',
        titleAlignment: 'center',
        dataAlignment: 'left',
        htmlInputType: 'text',
        placeHolder: 'Nombre del grupo',
        helpText: 'Nombre que identifica el grupo.',
        defaultValue: ''
      }]
    };
  }

  ngOnInit() {
  }
}