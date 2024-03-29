import { Component } from '@angular/core';
import { AspectService } from '../services/aspect.service';

@Component({
  selector: 'app-legal-guardian-qualify-catalog',
  templateUrl: './legal-guardian-qualify-catalog.component.html',
  styleUrls: ['./legal-guardian-qualify-catalog.component.css']
})
export class LegalGuardianQualifyCatalogComponent {
  aspectCatalog: any = [];
  configCrudComponent: any = {};
  loading: boolean = true;

  constructor(private aspectService: AspectService) {
    this.getAspectCatalog().then((result) => {
      this.aspectCatalog = result;
      this.loadComponent();
      this.loading = false;
    });
  }

  async getAspectCatalog() {
    const result = await this.aspectService.get();
    return result;
  }

  loadComponent() {
    this.configCrudComponent = {
      columns: [
        {
          name: 'idAspect',
          title: 'Aspecto',
          titleAlignment: 'center',
          dataAlignment: 'center',
          htmlInputType: 'select',
          placeHolder: 'Aspecto que agrupa la calificación.',
          helpText: 'Seleccione el aspecto que agrupa la calificación.',
          // defaultValue: this.periodActualValue,
          catalog: this.aspectCatalog
        },
        {
          name: 'qualify',
          title: 'Calificación',
          titleAlignment: 'center',
          dataAlignment: 'left',
          htmlInputType: 'text',
          placeHolder: 'Calificación para el acudiente.',
          helpText: 'Coloque una calificación para el acudiente, esta saldrá posteriormente en el boletín.',
          defaultValue: ''
        },

      ]
    };
  }


}
