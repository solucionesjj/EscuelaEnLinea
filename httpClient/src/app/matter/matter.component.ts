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
    this.areaGet();
    console.log(this.areas);
  }

  async areaGet() {
    const result = await this.areaComponent.areaGet();
    if(result.result)
    {
      this.areas = result.data;
    }
  }
}
