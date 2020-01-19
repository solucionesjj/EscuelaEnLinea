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

  constructor(private crudService: CrudService) {
    this.getUsers();
    this.getGroups();
  }

  async getUsers() {
    this.crudService.model = 'User';
    const result = await this.crudService.get();
    if (result.result) {
      this.userList = result.data;
    } 
  }

  loadGroups(email: string) {
    console.log(email);
  }

  async getGroups() {
    this.crudService.model = 'Group';
    const result = await this.crudService.get();
    if (result.result) {
      this.groupList = result.data;
    } 
  }

  ngOnInit() {
  }

}
