import { Component, OnInit, Input } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuObject: any = [];
  loadComponent: boolean = false;
  @Input() idUser: string;

  constructor(private crudService: CrudService) {

  }

  ngOnInit() {
    this.loadMenuItemsData().then(result => {
      this.loadComponent = true;
    })
  }

  async loadMenuItemsData() {
    if (parseInt(this.idUser) > 0) {
      let currentSection: string = '';
      const sqlQuery = `select s.id as sectionId,
        s.section as sectionTitle, 
        s.icon as sectionIcon,
        s.order as sectionOrder,
        c.id as menuId,
        c.menuTitle,
        c.description as menuDescription,
        c.icon as menuIcon,
        c.menuOrder,
        c.routerLink as menuRouterLink
      from Sections as s
      inner join Components as c
        on s.id = c.idSection
      inner join GroupComponents as gc
        on c.id = gc.idComponent
      inner join UserGroups as ug
        on ug.idGroup = gc.idGroup
      where ug.idUser = `+ this.idUser + `
      group by s.section, s.icon, c.menuTitle, c.description, c.icon
      order by s.order, c.menuOrder, c.menuTitle`;
      console.log(sqlQuery);
      const result = await this.crudService.getDynamicQuery(sqlQuery);
      if (result.result) {
        if (result.data.length > 0) {
          let sectionId: number = -1;
          for (let index = 0; index < result.data.length; index++) {
            if (currentSection != result.data[index].sectionTitle) {
              currentSection = result.data[index].sectionTitle;
              sectionId = sectionId + 1;
              this.menuObject[sectionId] =
              {
                sectionId: result.data[index].sectionId,
                sectionOrder: result.data[index].sectionOrder,
                sectionTitle: result.data[index].sectionTitle,
                sectionIcon: result.data[index].sectionIcon,
                items: [{
                  menuId: result.data[index].menuId,
                  menuOrder: result.data[index].menuOrder,
                  menuTitle: result.data[index].menuTitle,
                  menuIcon: result.data[index].menuIcon,
                  menuDescription: result.data[index].menuDescription,
                  menuRouterLink: result.data[index].menuRouterLink
                }]
              };
              
            } else {
              this.menuObject[sectionId].items.push(
                {
                  menuId: result.data[index].menuId,
                  menuOrder: result.data[index].menuOrder,
                  menuTitle: result.data[index].menuTitle,
                  menuIcon: result.data[index].menuIcon,
                  menuDescription: result.data[index].menuDescription,
                  menuRouterLink: result.data[index].menuRouterLink
                }
              )
            }
          }
        } else {

          this.menuObject[0] =
          {
            sectionOrder: '1',
            section: 'Sin menú...',
            sectionIcon: 'mdi mdi-alert',
            items: [{
              order: '1',
              menuTitle: 'Informe al administrador',
              menuDescription: 'No tiene privilegios para realizar actividades en el sistema.',
              menuIcon: 'mdi mdi-emoticon-sad'
            }]
          };
        }
      } else {
        alert('Error al consultar el menú.')
        console.log(result)
      }
    } else {
      console.log('No se a seleccionado un usuario para mostrar el menú.' + this.idUser)
    }

  }

}
