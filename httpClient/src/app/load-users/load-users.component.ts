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
  loadedDataMessage: string;
  model: string;

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
    this.model = 'User';
    this.crudService.model = this.model;
  }

  ngOnInit() {
  }

  loadData() {
    if (this.recordsData.length > 0) {
      this.records =
        this.recordsData
          .split('\n')
          .filter((row) => row !== '')
          .map((row: any, rowId: number) => {
            const recordArray = row.split('\t');
            const recordObject = {};
            let cell = 0;
            for (const column of this.columns) {
              recordObject[column] = recordArray[cell];
              cell++;
            }
            return recordObject;
          });
      this.recordsData = '';
      this.loadedDataMessage = 'Se identificaron ' + this.records.length + ' registros';
      console.log(this.records);
      //https://medium.com/@joomiguelcunha/learn-map-filter-and-reduce-in-javascript-ea59009593c4
    }
  }

  async saveData() {
    for (let index = 0; index < this.records.length; index++) {
      const result = await this.crudService.add(this.records[index]);
      if (result.result) {
        this.records[index]['Resultado'] = 'Correcto';
      } else {
        this.records[index]['Resultado'] = result.message;
      }
    }
  }
}
