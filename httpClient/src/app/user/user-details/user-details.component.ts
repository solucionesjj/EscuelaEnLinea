import { Component, OnInit, OnChanges } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: any = {};
  idSelectedUser: string;
  idselectedFather: number;
  idselectedMother: number;
  foundUsers: any = [];
  searchType: string;
  searchCriteria: string;

  constructor(private crudService: CrudService, private route: ActivatedRoute) {
  }

  async findUsers() {
    if (this.searchCriteria.length > 2) {
      this.crudService.model = 'User';
      const query = `select id,name, surname, identificationDocument, identificationDocumentType from Users where lower(name) like lower('%` + this.searchCriteria + `%') or lower(surname) like lower('%` + this.searchCriteria + `%') or identificationDocument = lower('%` + this.searchCriteria + `%')`;
      const result = await this.crudService.getDynamicQuery(query);
      console.log(result.data[0]);
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

  ngOnInit() {
    this.idSelectedUser = this.route.snapshot.paramMap.get('id');
    this.lodaUserInfo();
  }

  selectUser(id: number) {
    if (this.searchType === 'father') {
      this.idselectedFather = id;
    } else {
      this.idselectedMother = id;
    }
  }

  selectMother() {

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

}
