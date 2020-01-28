import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
declare var $: any;
@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css']
})
export class UserGroupComponent implements OnInit {

  userList: any = [];
  groupList: any = [];
  userGroups: any = [];
  groupUsers: any = [];
  idSelectedUser: number;
  idSelectedGroup: number;
  filterText: string;

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

  loadGroups(idUser: number, item: any) {
    this.idSelectedUser = idUser;
    $('#divUsersList>a.active').removeClass('active');
    $(item).addClass('active');
    this.getUserGroups();
  }

  loadUsers(idGoup: number, item: any) {
    this.idSelectedGroup = idGoup;
    $('#divGroupsList>a.active').removeClass('active');
    $(item).addClass('active');
    this.getGroupUsers();
  }

  async getGroups() {
    this.crudService.model = 'Group';
    const result = await this.crudService.get();
    if (result.result) {
      this.groupList = result.data;
    }
  }

  async setUserToGroup(user: any) {
    if (user.idUserGroup === 0) {
      const object: any = { idUser: user.id, idGroup: this.idSelectedGroup };
      this.crudService.model = 'UserGroup';
      const result = await this.crudService.add(object);
      if (result.result) {
        this.groupUsers = result.data;
      }
    } else {
      const object: any = { id: user.idUserGroup };
      this.crudService.model = 'UserGroup';
      const result = await this.crudService.delete(object);
      if (result.result) {
        this.groupUsers = result.data;
      }
    }
    this.getGroupUsers();
  }

  async setGroupToUser(group: any) {
    if (group.idUserGroup === 0) {
      const object: any = { idGroup: group.id, idUser: this.idSelectedUser };
      this.crudService.model = 'UserGroup';
      const result = await this.crudService.add(object);
      if (result.result) {
        this.userGroups = result.data;
      }
    } else {
      const object: any = { id: group.idUserGroup };
      this.crudService.model = 'UserGroup';
      const result = await this.crudService.delete(object);
      if (result.result) {
        this.userGroups = result.data;
      }
    }
    this.getUserGroups();
  }

  async getUserGroups() {
    this.crudService.model = 'UserGroup';
    const searchCriteria = `{"where": {"idUser":"` + this.idSelectedUser + `"}}`;
    const result = await this.crudService.getSearch(searchCriteria);
    if (result.result) {
      this.userGroups = result.data;
      this.groupList.forEach(groupParametrized => {
        const userGroupEvaluated = this.userGroups.filter(f => f.idGroup === groupParametrized.id);
        if (userGroupEvaluated.length > 0) {
          groupParametrized['idUserGroup'] = userGroupEvaluated[0].id;
        } else {
          groupParametrized['idUserGroup'] = 0;
        }
      });
    }
  }


  async getGroupUsers() {
    this.crudService.model = 'UserGroup';
    const searchCriteria = `{"where": {"idGroup":"` + this.idSelectedGroup + `"}}`;
    const result = await this.crudService.getSearch(searchCriteria);
    if (result.result) {
      this.groupUsers = result.data;
      this.userList.forEach(userParametrized => {
        const groupUserEvaluated = this.groupUsers.filter(f => f.idUser === userParametrized.id);
        if (groupUserEvaluated.length > 0) {
          userParametrized['idUserGroup'] = groupUserEvaluated[0].id;
        } else {
          userParametrized['idUserGroup'] = 0;
        }
      });
    }
  }

  ngOnInit() {
  }

}
