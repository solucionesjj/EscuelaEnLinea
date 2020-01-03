import { Component, OnInit } from '@angular/core';
import { ApiclientService } from '../services/apiclient.service';
import { AreaService } from '../services/area.service';

declare var $: any; //para poder usar los comandos con $ de jquery

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  areas;
  area: any = {};

  constructor(private http: ApiclientService, private areaService: AreaService) { }

  ngOnInit() {
    this.area.area = null;
    this.area.order = true;
    this.areaGet();
  }

  async areaGet(): Promise<any> {
    const result = await this.areaService.areaGet();
    this.areas = result;
  }

  async areaAdd(): Promise<any> {
    if (this.area.area != '') {
      const result = await this.areaService.areaAdd(this.area);
      this.area.area = null;
      console.log(result);
      this.areaGet();
    }
    else {
      console.log("No se puede crear un area sin nombre.");
    }
  }

  areaEdit(areaToUpdate) {
    this.area.id = areaToUpdate.id;
    this.area.area = areaToUpdate.area;
    this.area.order = areaToUpdate.order;
    $('#modalAreaEdit').modal('show');
  }

  areaEditClose() {
    this.area.id = null;
    this.area.area = null;
    this.area.order = 1;
    this.areaGet();
    $('#modalAreaEdit').modal('hide');
  }

  async areaUpdate(): Promise<any> {
    if (this.area.area != '') {
      const result = await this.areaService.areaUpdate(this.area);
      this.areaEditClose();
    }
    else {
      console.log("No se puede actualizar un area sin nombre.");
    }
  }

  async areaDelete(areaToDelete): Promise<any> {
    if (areaToDelete.id != '') {
      if (confirm('¿Desea eliminar el area: ' + areaToDelete.area + '?')) {
        const result = await this.areaService.areaDelete(areaToDelete);
        this.areaGet();
      }

    }
    else {
      console.log("No se puede eliminar un area sin el correspondiente id.");
    }
  }

}
