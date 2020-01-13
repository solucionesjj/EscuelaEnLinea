import { Component, OnInit, OnChanges } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-load-users',
  templateUrl: './load-users.component.html',
  styleUrls: ['./load-users.component.css']
})
export class LoadUsersComponent implements OnInit {

  records: any = {};
  recordsData: any = [{}];
  columnsPerRow: number;

  columns = [
    'email',
    'name',
    'surname',
    'active',
    'gender',
    'identificationDocumentType',
    'identificationDocument',
    'birthday',
    'identificationDocumentExpeditionSite',
    'nationality'
  ];

  constructor(private crudService: CrudService) {
    this.recordsData = '';
  }

  ngOnInit() {
  }

  loadData() {
    if (this.recordsData.length > 0) {
      this.columnsPerRow = this.recordsData[0].length;
      this.records = this.recordsData.split('\n').map((row: any) => row.split('\t').map((record) => [{
        email: record[0],
        name: record[1],
        surname: record[2],
        active: record[3],
        gender: record[4],
        identificationDocumentType: record[5],
        identificationDocument: record[6],
        birthday: record[7],
        identificationDocumentExpeditionSite: record[8],
        nationality: record[9]
      }]));
      console.log(this.records);
    }
  }
}
