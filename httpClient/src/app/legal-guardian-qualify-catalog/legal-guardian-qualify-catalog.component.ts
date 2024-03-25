import { Component, OnInit } from '@angular/core';
import { AspectService } from '../services/aspect.service';

@Component({
  selector: 'app-legal-guardian-qualify-catalog',
  templateUrl: './legal-guardian-qualify-catalog.component.html',
  styleUrls: ['./legal-guardian-qualify-catalog.component.css']
})
export class LegalGuardianQualifyCatalogComponent implements OnInit {
  aspectCatalog: any = [];
  configCrudComponent: any = {};

  constructor(private aspectService: AspectService) {
    this.getAspectCatalog().then(result => { console.log(result); this.aspectCatalog = result; console.log(this.aspectCatalog); });
    
    
    this.configCrudComponent = {
      columns: [
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
        {
          name: 'idAspect',
          title: 'Aspecto',
          titleAlignment: 'center',
          dataAlignment: 'center',
          htmlInputType: 'select',
          placeHolder: 'Aspecto que agrupa la calificación.',
          helpText: 'Seleccione el aspecto que agrupa la calificación.',
          // defaultValue: this.periodActualValue,
          // catalog: this.aspectCatalog       
         },
      ]
    };
   }

  async getAspectCatalog() {
    let result = await this.aspectService.get();
    console.log(result);
    return result;
  }

  ngOnInit() {
   
  }

}
