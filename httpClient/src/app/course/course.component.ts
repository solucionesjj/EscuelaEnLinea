import { Component, OnInit } from '@angular/core';
import { ApiclientService } from '../services/apiclient.service'

declare var $: any; //para poder usar los comandos con $ de jquery

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {

  courses;
  course: any = {};
  constructor(private http: ApiclientService) { }

  ngOnInit() {
    this.course.course = null;
    this.course.active = true;
    this.course.year = (new Date()).getFullYear();
    this.course.order = 1;
    this.courseGet();
  }

  async courseGet(): Promise<any> {
    const result = await this.http.Get("course");
    this.courses = result;
  }

  async courseAdd(): Promise<any> {
    if(this.course.course != '')
    {
    const result = await this.http.Post("course/create",this.course);
    this.course.course = null;
    console.log(result); 
    this.courseGet();     
    }
    else
    {
      console.log("No se puede crear un curso sin nombre.");
    }
  }

  courseEdit(courseToUpdate) {
    this.course.id = courseToUpdate.id;
    this.course.course = courseToUpdate.course;
    this.course.active = courseToUpdate.active;
    this.course.order = courseToUpdate.order;
    $('#modalCourseEdit').modal('show');
  }

  courseEditClose() {
    this.course.id = null;
    this.course.course = null;
    this.course.active = 1;
    this.course.order = 1;
    this.courseGet();    
    $('#modalCourseEdit').modal('hide');
  }

  async courseUpdate(): Promise<any> {
    if(this.course.course != '')
    {
    const result = await this.http.Put("course/"+this.course.id,this.course);
    this.courseEditClose();
    }
    else
    {
      console.log("No se puede actualizar un curso sin nombre.");
    }
  }

  async courseDelete(courseToDelete): Promise<any> {
    if(courseToDelete.id != '')
    {
      if(confirm('¿Desea eliminar el curso: '+courseToDelete.course+'?'))
      {
      const result = await this.http.Delete("course/"+courseToDelete.id);
      this.courseGet();         
      }

    }
    else
    {
      console.log("No se puede eliminar un curso sin el correspondiente id.");
    }
  }

}