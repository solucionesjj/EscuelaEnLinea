import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legal-guardian-qualify',
  templateUrl: './legal-guardian-qualify.component.html',
  styleUrls: ['./legal-guardian-qualify.component.css']
})
export class LegalGuardianQualifyComponent implements OnInit {
  configCrudComponent: any = {};

  constructor() { }

  ngOnInit() {
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

// idMatriculations
// bimestre
// idLegalGuardianQualityCatalog