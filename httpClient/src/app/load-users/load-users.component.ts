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
    'nationality',
    'nicolas'
  ];

  constructor(private crudService: CrudService) {
    this.recordsData = '';
  }

  ngOnInit() {
  }

  loadData() {
    if (this.recordsData.length > 0) {
      this.columnsPerRow = this.recordsData[0].length;
      this.records =
        this.recordsData.split('\n')
          .map((row: any, rowId: number) => {
            const recordArray = row.split('\t');
            var recordObject = {};
            let cell = 0;
            for (const column of this.columns) {
              recordObject[column] = recordArray[cell];
              cell++;
            }
            return recordObject;
          });

      console.log(this.records);

      console.log(this.records.filter(function (item: any) { return item.active == 1 }));

      //https://medium.com/@joomiguelcunha/learn-map-filter-and-reduce-in-javascript-ea59009593c4

    }
  }
}
