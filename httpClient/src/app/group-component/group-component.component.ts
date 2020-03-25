import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

declare var $: any;

@Component({
  selector: 'app-group-component',
  templateUrl: './group-component.component.html',
  styleUrls: ['./group-component.component.css']
})
export class GroupComponentComponent implements OnInit {
  groupList: any = [];
  idGroup:string;
  group:any = {};

  constructor(private crudService:CrudService) { 
    this.idGroup = '0';
    this.getGroups();
  }

  async getGroups() {
    this.crudService.model = 'Group';
    const result = await this.crudService.get();
    if (result.result) {
      this.groupList = result.data;
    }
  }

  selectGroup(group,item) {
    this.group = group;
    $('#divGroupsList>a.active').removeClass('active');
    $(item).addClass('active');
  }

  ngOnInit() {
  }

}
