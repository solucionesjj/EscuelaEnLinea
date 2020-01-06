import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { environment } from 'src/environments/environment';

declare var $: any;
// $ es para poder usar los comandos de jquery

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})

export class CrudComponent implements OnInit, OnChanges {
  objects: any = [];
  object: any = {};
  columns: any = {};
  controls: any = {};
  returnedMessage: string;
  errorMessageAlert: boolean;
  dateFormat: string;
  formAction: string;

  @Input() model: string;
  @Input() configCrudComponent: any = {};

  constructor(private crudService: CrudService) {
  }

  ngOnInit() {
    this.dateFormat = environment.dateFormat;
    this.columns = this.configCrudComponent.columns;
    this.controls = this.columns;
    this.errorMessageAlert = false;
    $('.toast').toast({ autohide: true, delay: 3000 });
    $('.toast').toast('hide');
    //console.log(this.columns);

  }

  ngOnChanges() {
    this.get();
  }


  async get() {
    this.crudService.model = this.model;
    const result = await this.crudService.get();
    this.objects = result.data;
  }

  async add() {
    this.crudService.model = this.model;
    const result = await this.crudService.add(this.object);

    if (result.result) {
      this.errorMessageAlert = false;
      this.returnedMessage = result.message;
      $('#modalForm').modal('hide');
      $('.toast').toast('show');
      this.get();
    } else {
      this.errorMessageAlert = true;
      this.returnedMessage = result.message;
    }
  }

  async update() {
    this.crudService.model = this.model;
    const result = await this.crudService.update(this.object);

    if (result.result) {
      this.errorMessageAlert = false;
      this.returnedMessage = result.message;
      $('#modalForm').modal('hide');
      $('.toast').toast('show');
      this.get();
    } else {
      this.errorMessageAlert = true;
      this.returnedMessage = result.message;
    }
  }

  async delete() {
    this.crudService.model = this.model;
    const result = await this.crudService.delete(this.object);

    if (result.result) {
      this.errorMessageAlert = false;
      this.returnedMessage = result.message;
      $('#modalForm').modal('hide');
      $('.toast').toast('show');
      this.get();
    } else {
      this.errorMessageAlert = true;
      this.returnedMessage = result.message;
    }
  }

  prepareInsertForm() {
    this.formAction = 'add';
    for (const control of this.controls) {
      if (control.defaultValue !== '') {
        this.object[control.name] = control.defaultValue;
      }
    }
  }

  prepareUpdateForm(object: any) {
    this.formAction = 'update';
    this.object = object;
  }

  prepareDeleteForm(object: any) {
    this.formAction = 'delete';
    this.object = object;
  }

  clearReturnedMessage() {
    this.errorMessageAlert = false;
    this.returnedMessage = '';
  }

  getCurrentDate() {
    return Date();
  }

  getValueFromArray(arrayObject: [], idToFind: string) {
    for (const row of arrayObject) {
      if (row.id === idToFind) {
        return row.value;
      }
    }
  }


}
