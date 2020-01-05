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
      $('#modalToAddRecord').modal('hide');
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
      $('#modalToUpdateRecord').modal('hide');
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
      $('#modalToDeleteRecord').modal('hide');
      $('.toast').toast('show');
      this.get();
    } else {
      this.errorMessageAlert = true;
      this.returnedMessage = result.message;
    }
  }

  prepareInsertForm() {
    for (const control of this.controls) {
      this.object[control.name] = control.defaultValue;
    }
  }

  prepareUpdateForm(object: any) {
    this.object = object;
    console.log(object);
  }

  getCurrentDate() {
    return Date();
  }

  confirmDelete(object: any) {
    this.object = object;
  }
}
