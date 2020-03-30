import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css']
})
export class ReportCardComponent implements OnInit {

  selectedYear: number = 0;
  range: number = 5;
  yearList: any = [];
  currentYear: number = (new Date()).getFullYear();

  constructor() {
    let initialYear: number = this.currentYear - this.range;
    const finalYear = initialYear + (this.range * 2);
    for (let actualYear = initialYear; actualYear <= finalYear; actualYear++) {
      this.yearList.push({ value: actualYear, text: actualYear });
    }
    this.selectedYear = this.currentYear;
  }

  ngOnInit() {
  }

}
