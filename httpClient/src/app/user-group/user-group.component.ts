import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css']
})
export class UserGroupComponent implements OnInit {

  userList: any = [];
  groupList: any = [];
  userGroups: any = [];
  idSelectedUser: number;

  constructor(private crudService: CrudService) {
    this.getUsers();
    this.getGroups();
    this.idSelectedUser = 0;
  }

  async getUsers() {
    this.crudService.model = 'User';
    const result = await this.crudService.get();
    if (result.result) {
      this.userList = result.data;
    } 
  }

  loadGroups(idUser: number) {
    this.idSelectedUser = idUser;
  }

  async getGroups() {
    this.crudService.model = 'Group';
    const result = await this.crudService.get();
    if (result.result) {
      this.groupList = result.data;
    } 
  }

  async setGroupToUser() {
    // this.crudService.model = 'UserGroup';
    // const result = await this.crudService.put();
    // if (result.result) {
    //   this.userGroups = result.data;
    // }    
  }

  async getUserGroups() {
    this.crudService.model = 'UserGroup';
    const result = await this.crudService.get();
    if (result.result) {
      this.userGroups = result.data;
    } 
  }

  ngOnInit() {
  }

}
