import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudComponent } from '../crud/crud.component';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-grade-definition',
  templateUrl: './grade-definition.component.html',
  styleUrls: ['./grade-definition.component.css']
})
export class GradeDefinitionComponent implements OnInit {

  idAcademicLoad: string;
  academicLoadSelected: any = {};
  academicLoadNotes
  note: any = {};
  configCrudComponent: any = {};
  whereComponent: string;

  constructor(private route: ActivatedRoute, private crudService: CrudService) {
  }



  ngOnInit() {
    this.idAcademicLoad = this.route.snapshot.paramMap.get('id');

    this.configCrudComponent = {
      columns: [{
        name: 'idAcademicLoad',
        title: 'idAcademicLoad',
        titleAlignment: 'center',
        dataAlignment: 'left',
        htmlInputType: 'hidden',
        placeHolder: 'idAcademicLoad',
        helpText: 'idAcademicLoad',
        defaultValue: this.idAcademicLoad,
        catalog: null
      },
      {
        name: 'dueDate',
        title: 'Fecha finalizacion',
        titleAlignment: 'center',
        dataAlignment: 'center',
        htmlInputType: 'date',
        placeHolder: 'Fecha de finalización de la nota.',
        helpText: 'Fecha de finalización de la nota.',
        defaultValue: '',
        catalog: null
      },
      {
        name: 'grade',
        title: 'Nota',
        titleAlignment: 'center',
        dataAlignment: 'left',
        htmlInputType: 'text',
        placeHolder: 'Título para la nota.',
        helpText: 'Título para la nota.',
        defaultValue: '',
        catalog: null
      },
      {
        name: 'description',
        title: 'Descripción',
        titleAlignment: 'center',
        dataAlignment: 'left',
        htmlInputType: 'text',
        placeHolder: 'Descripción de la nota.',
        helpText: 'Descripción de la nota.',
        defaultValue: '',
        catalog: null
      }
      ]
    };

    this.whereComponent = `{"where":{"idAcademicLoad":"` + this.idAcademicLoad + `"}}`;

    this.lodaAcademicLoadInfo();
  }


  async lodaAcademicLoadInfo() {

    const query = `select Courses.course, Areas.area, Matters.matter, Users.name,Users.surname, AcademicLoads.hoursPerWeek 
from AcademicLoads  
inner join Courses 
	on Courses.id = AcademicLoads.idCourse 
inner join Matters 
	on Matters.id = AcademicLoads.idMatter 
inner join Areas 
	on Areas.id = Matters.idArea 
inner join Users 
  on Users.id = AcademicLoads.idTeacher 
where AcademicLoads.id = `+ this.idAcademicLoad;
    this.crudService.model = 'AcademicLoad';
    const result = await this.crudService.getDynamicQuery(query);
    if (result.result) {
      if (result.data.length > 0) {
        this.academicLoadSelected = result.data[0];
      } else {
        console.log('No se encontraron datos.');
      }
    } else {
      console.log(result.message);
    }
  }
}
