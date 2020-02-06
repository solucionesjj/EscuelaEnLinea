import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { PeriodService } from '../services/period.service';

@Component({
  selector: 'app-grade-definition',
  templateUrl: './grade-definition.component.html',
  styleUrls: ['./grade-definition.component.css']
})
export class GradeDefinitionComponent implements OnInit {
  idAcademicLoad: string;
  academicLoadSelected: any = {};
  academicLoadNotes: any = {};
  note: any = {};
  configCrudComponent: any = {};
  whereComponent: string;
  periodCatalog: any = [];
  periodActualValue: string;
  selectedPeriod: string;

  constructor(private route: ActivatedRoute, private crudService: CrudService, private periodService: PeriodService) {
    this.getActualPeriod();

    this.idAcademicLoad = this.route.snapshot.paramMap.get('id');

    this.lodaAcademicLoadInfo();
  }

  ngOnInit() {
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
        name: 'period',
        title: 'Periodo',
        titleAlignment: 'center',
        dataAlignment: 'center',
        htmlInputType: 'select',
        placeHolder: 'Periodo donde estará vigente la nota.',
        helpText: 'Periodo donde estará vigente la nota.',
        defaultValue: this.periodActualValue,
        catalog: this.periodCatalog
      },
      {
        name: 'weight',
        title: 'Peso evaluativo',
        titleAlignment: 'center',
        dataAlignment: 'center',
        htmlInputType: 'number',
        placeHolder: 'Peso de la nota.',
        helpText: 'Coloque un valor de 1 a 100 teniendo en cuenta que todas las notas deben sumar 100.',
        defaultValue: '25',
        catalog: null
      },
      ]
    };
    this.whereComponent = `{"where":{"idAcademicLoad":"` + this.idAcademicLoad + `"}}`;
  }

  async getActualPeriod() {
    this.periodActualValue = this.periodService.get();
    this.periodCatalog.push({ id: '', value: '' });
    this.periodCatalog.push({ id: this.periodActualValue, value: this.periodActualValue });
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
      if (result.data) {
        this.academicLoadSelected = result.data[0];
      } else {
        console.log('No se encontraron datos.');
      }
    } else {
      console.log(result.message);
    }
  }

  filter() {
    if (this.selectedPeriod === '0') {
      this.whereComponent = `{"where":{"idAcademicLoad":"` + this.idAcademicLoad + `"}}`;
    } else {
      this.whereComponent = `{"where":{"idAcademicLoad":"` + this.idAcademicLoad + `","period":"` + this.selectedPeriod + `"}}`;
    }
  }

}
