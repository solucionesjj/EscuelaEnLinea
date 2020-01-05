import { Component, OnInit } from '@angular/core';
import { AreaComponent } from '../area/area.component';

@Component({
  selector: 'app-matter',
  templateUrl: './matter.component.html',
  styleUrls: ['./matter.component.css']
})
export class MatterComponent implements OnInit {

  areas: any = [];

  constructor(private areaComponent: AreaComponent) {
  }

  ngOnInit() {
  }
}
