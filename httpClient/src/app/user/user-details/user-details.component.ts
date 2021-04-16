import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

declare var $: any;

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: any = {};
  idSelectedUser: string;
  selectedParent: any = {};
  foundUsers: any = [];
  searchType: string;
  searchCriteria: string;
  fatherInfo: any = {};
  motherInfo: any = {};
  matriculationConfigCrudComponent: any = {};
  matriculationWhereComponent: string;
  coursesCatalog: any = [];
  matriculationLoadComponent: boolean;
  showSelectedParent: boolean;

  constructor(private userService: UserService, private crudService: CrudService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.idSelectedUser = this.route.snapshot.paramMap.get('id');
    this.matriculationLoadComponent = false;
    this.fatherInfo.CompleteName = 'Aún no se encuentra definido';
    this.motherInfo.CompleteName = 'Aún no se encuentra definido';
    this.lodaUserInfo()
      .then((success) => { this.getFhaterAndMotherInfo(); })
      .catch((error) => { console.log('Error al cargar la inforamción del usuario.') });
    this.getCoursesCatalog()
      .then((success) => { this.setCrudAttributes(); })
      .catch((error) => { console.log('Error al consultar el listado de cursos.') });
  }

  async findUsers() {
    this.selectedParent = {};
    if (this.searchCriteria.length > 2) {
      this.crudService.model = 'User';
      const query = `select u.id, 
      u.name, 
      u.surname, 
      u.identificationDocument, 
      u.identificationDocumentType 
      from Users as u 
      inner join UserGroups as ug 
      on u.id = ug.idUser 
      inner join Groups as g 
      on g.id = ug.idGroup 
      and g.group = 'Padre' 
      where lower(name) like lower('%` + this.searchCriteria + `%') 
      or lower(surname) like lower('%` + this.searchCriteria + `%') 
      or identificationDocument = lower('%` + this.searchCriteria + `%')`;
      const result = await this.crudService.getDynamicQuery(query);
      if (result.result) {
        if (result.data.length > 0) {
          this.foundUsers = result.data;
        } else {
          console.log('No se encontraron datos.');
        }
      } else {
        console.log(result.message);
      }
    }
  }

  async getFhaterAndMotherInfo() {
    if (this.user.idFather > 0) {
      this.fatherInfo = await this.userService.getUserInformation(this.user.idFather);
    } else {
      this.fatherInfo.CompleteName = 'Aún no se encuentra definido';
    }
    if (this.user.idMother > 0) {
      this.motherInfo = await this.userService.getUserInformation(this.user.idMother);
    } else {
      this.motherInfo.CompleteName = 'Aún no se encuentra definido';
    }
  }

  async lodaUserInfo() {
    this.crudService.model = 'User';
    const searchCriteria = `{"where": {"id":"` + this.idSelectedUser + `"}}`;
    const result = await this.crudService.getSearch(searchCriteria);
    if (result.result) {
      if (result.data.length > 0) {
        this.user = result.data[0];
      } else {
        console.log('No se encontraron datos.');
      }
    } else {
      console.log(result.message);
    }
  }

  setCrudAttributes() {
    this.matriculationWhereComponent = `{"where":{"idStudent":"` + this.idSelectedUser + `"}}`;
    this.matriculationConfigCrudComponent = {
      columns: [{
        name: 'date',
        title: 'Fecha Matricula',
        titleAlignment: 'center',
        dataAlignment: 'left',
        htmlInputType: 'date',
        placeHolder: 'Fecha Matrícula',
        helpText: 'Fecha en la que el estudiante se matrícula al curso.',
        defaultValue: ''
      },
      {
        name: 'sheet',
        title: 'Folio',
        titleAlignment: 'center',
        dataAlignment: 'right',
        htmlInputType: 'text',
        placeHolder: 'Número del folio',
        helpText: 'Número asociado al folio de la matrícula.',
        defaultValue: ''
      },
      {
        name: 'number',
        title: 'Número de Matrícula',
        titleAlignment: 'center',
        dataAlignment: 'right',
        htmlInputType: 'text',
        placeHolder: 'Número de la matrícula.',
        helpText: 'Número asociado a la matrícula.',
        defaultValue: ''
      },
      {
        name: 'idCourse',
        title: 'Curso',
        titleAlignment: 'center',
        dataAlignment: 'center',
        htmlInputType: 'select',
        placeHolder: 'Número de la matrícula.',
        helpText: 'Curso en el que se matriculará el estudiante.',
        defaultValue: '',
        catalog: this.coursesCatalog
      },
      {
        name: 'idStudent',
        title: 'Id Estudiante',
        titleAlignment: 'center',
        dataAlignment: 'center',
        htmlInputType: 'hidden',
        placeHolder: 'Id del estudiante.',
        helpText: '',
        defaultValue: this.idSelectedUser,
        catalog: null
      },
      ]
    };
    this.matriculationLoadComponent = true;
  }

  selectParentInformation(idParent: number, completeName: string, type: string, identificationDocument: string) {
    this.selectedParent = {};

    this.selectedParent.completeName = completeName;
    this.selectedParent.id = this.idSelectedUser;
    this.selectedParent.parentIdentificationDocument = identificationDocument;
    if (type === 'mother') {
      this.selectedParent.typeParent = 'Madre';
      this.selectedParent.idMother = idParent;
      this.selectedParent.idFather = 0;
    } else {
      this.selectedParent.typeParent = 'Padre';
      this.selectedParent.idFather = idParent;
      this.selectedParent.idMother = 0;
    }
    this.showSelectedParent = true;
  }
/*
  async getCoursesCatalog() {
    this.crudService.model = 'Course';
    const result = await this.crudService.get();
    if (result.result) {
      this.coursesCatalog = result.data.map(m => ({ id: m.id, value: m.course }));
    }
  }
  */


  async getCoursesCatalog() {
    const sqlQuery = `select c.id as idCourse, 
                      concat(c.year,' - ',c.course) as course 
                      from Courses as c 
                      order by c.year desc, c.order asc`;
    this.crudService.model = 'Course';
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      for (const row of result.data) {
        this.coursesCatalog.push({ id: row.idCourse, value: row.course });
      }
    } else {
      alert('Error al consultar el catálogo de cursos.')
      console.log(result)
    }
  }

  async saveParent() {
    this.crudService.model = 'User';
    if (this.selectedParent.idMother > 0 || this.selectedParent.idFather > 0) {
      const result = await this.crudService.update(this.selectedParent);
      if (result.result) {
        $('#modalSelectMother').modal('hide');
        $('#modalSelectFather').modal('hide');
      } else {
        console.log('Error al actualizar los datos. ' + result.message)
      }
    } else {
      console.log('Por favor seleccione un usuario.')
    }
  }

  async selectMatriculation(matriculation: any) {
    console.log(matriculation);
  }

}
