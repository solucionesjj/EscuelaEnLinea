import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { GroupComponent } from '../group/group.component';

@Component({
  selector: 'app-grant-permisson',
  templateUrl: './grant-permisson.component.html',
  styleUrls: ['./grant-permisson.component.css']
})



export class GrantPermissonComponent implements OnInit, OnChanges {
  loadComponent: boolean = false;
  grantedPermissons: any = [];
  @Input() group: any;

  constructor(private crudService: CrudService) {

  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.getComponentList().then(result => {
      this.loadComponent = true;
    });
  }

  async getComponentList() {
    this.loadComponent = false;
    if (this.group.id > 0) {
      this.crudService.model = 'Component';
      const sqlQuery = `select s.section as section, 
      c.menuTitle as title, 
      c.description as description, 
      c.id as idComponent, 
      `+ this.group.id + ` as idGroup, 
      gc.id as idGroupComponent 
    from Sections as s 
    inner join Components as c 
      on s.id = c.idSection 
    left join GroupComponents as gc 
      on c.id = gc.idComponent 
      and gc.idGroup = `+ this.group.id + `
    where c.showInMenu = 1 
    order by s.order, c.menuOrder, c.menuTitle`;
      const result = await this.crudService.getDynamicQuery(sqlQuery);
      if (result.result) {
        this.grantedPermissons = result.data;
      }
    }
  }

  grantPermissons(permisson: any, item: any) {
    if (permisson.idGroupComponent > 0 && item.value == false) {
      this.revoquePermisson(permisson.idGroupComponent).then(result => {
        this.getComponentList().then(result => {
          this.loadComponent = true;
        });
      });
    } else {
      this.grantPermisson(permisson.idGroup, permisson.idComponent).then(result => {
        this.getComponentList().then(result => {
          this.loadComponent = true;
        });
      });
    }
  }

  async grantPermisson(idGroup: number, idComponent: number) {
    let GroupComponentObject = { idGroup: idGroup, idComponent: idComponent };
    this.crudService.model = 'GroupComponent';
    const result = await this.crudService.add(GroupComponentObject);
    if (result.result) {
      //resultado correcto
    } else {
      alert('Error al otorgar el permiso.')
      console.log(result)
    }
  }

  async revoquePermisson(idGroupComponent: number) {
    let GroupComponentObject = { id: idGroupComponent };
    this.crudService.model = 'GroupComponent';
    const result = await this.crudService.delete(GroupComponentObject);
    if (result.result) {
      //resultado correcto
    } else {
      alert('Error al otorgar el permiso.')
      console.log(result)
    }
  }

  ngOnInit() {
  }

}
