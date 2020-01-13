import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  configCrudComponent: any = {};
  catalogIdentificationTypes: any = [];
  catalogGender: any = [];
  catalogNationality: any = [];

  constructor() {

    this.catalogIdentificationTypes = [
      { id: 'Cédula', value: 'Cedula' },
      { id: 'Cédula de extrangería', value: 'Cedula de extrangería' },
      { id: 'Número único de identificación personal', value: 'Número único de identificación personal' },
      { id: 'Pasaporte', value: 'Pasaporte' },
      { id: 'Regisro civil', value: 'Regisro civil' },
      { id: 'Tarjeta de identidad', value: 'Tarjeta de identidad' }
    ];

    this.catalogGender = [
      { id: 'Femenino', value: 'Femenino' },
      { id: 'Masculino', value: 'Masculino' },
      { id: 'Otro', value: 'Otro' }
    ];

    this.catalogNationality = [
      { id: 'Colombia', value: 'Colombia' },
      { id: 'Otro', value: 'Otro' }
    ];

    this.configCrudComponent = {
      columns: [
        {
          name: 'name',
          title: 'Nombres',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Nombre de la persona.',
          helpText: 'Coloque los nombres de la persona.',
          defaultValue: '',
          catalog: null
        },
        {
          name: 'surname',
          title: 'Apellidos',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Apellidos de la persona.',
          helpText: 'Coloque los apellidos de la persona.',
          defaultValue: '',
          catalog: null
        },
        {
          name: 'gender',
          title: 'Genero',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'select',
          placeHolder: 'Genero de la persona.',
          helpText: 'Coloque el genero de la persona.',
          defaultValue: '',
          catalog: this.catalogGender
        },
        {
          name: 'email',
          title: 'Correo',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'email',
          placeHolder: 'correo@dominio.com',
          helpText: 'Correo electrónico de la persona.',
          defaultValue: '',
          catalog: null
        },
        {
          name: 'identificationDocument',
          title: 'Número de Identificación',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Número de identificación.',
          helpText: 'Coloque el número de identificación.',
          defaultValue: '',
          catalog: null
        },
        {
          name: 'identificationDocumentType',
          title: 'Tipo de identificación',
          titleAlignment: 'center',
          dataAlignment: 'center',
          htmlInputType: 'select',
          placeHolder: 'Tipo de identificación.',
          helpText: 'Coloque el tipo de identificación.',
          defaultValue: '',
          catalog: this.catalogIdentificationTypes
        },
        {
          name: 'identificationDocumentExpeditionSite',
          title: 'Lugar de expedición',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Lugar de expedición',
          helpText: 'Lugar de expedición de la identificación.',
          defaultValue: '',
          catalog: null
        },
        {
          name: 'nationality',
          title: 'Nacionalidad',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'select',
          placeHolder: 'Nacionalidad',
          helpText: 'Escriba el nombre del país.',
          defaultValue: '',
          catalog: this.catalogNationality
        },
        {
          name: 'active',
          title: 'Activo',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'checkbox',
          placeHolder: 'Si está activo o no',
          helpText: 'Si el usuario se creará activo o no.',
          defaultValue: '1',
          catalog: null
        }]
    };
  }


  ngOnInit() {
  }

}
