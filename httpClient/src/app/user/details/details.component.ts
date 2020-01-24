import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  // userId: number;

constructor(private router:Router) {
  // this.router.queryParams.subscribe(params => {
  //   this.userId = params['id'];
  // });
}

ngOnInit() {
}

}
