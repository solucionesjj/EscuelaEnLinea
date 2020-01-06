import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-matter',
  templateUrl: './matter.component.html',
  styleUrls: ['./matter.component.css']
})
export class MatterComponent implements OnInit {

  configCrudComponent: any = {};
  catalogo: any = [];

  constructor(private crudService: CrudService) {
    this.getAreasList();
    this.configCrudComponent = {
      columns: [
        {
          name: 'idArea',
          title: 'Área',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'select',
          placeHolder: 'Nombre del Área',
          helpText: 'Seleccione el área al cual pertenecerá la materia.',
          defaultValue: '',
          catalog: this.catalogo
        },
        {
          name: 'matter',
          title: 'Materia',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Nombre de la materia.',
          helpText: 'Nombre que describe la materia, ej: Español.',
          defaultValue: ''
        }]
    };
  }

  async getAreasList() {
    this.crudService.model = 'Area';
    const result = await this.crudService.get();
    for (const row of result.data) {
      this.catalogo.push({id: row.id, value: row.area});
    }
  }

  ngOnInit() {
  }
}
