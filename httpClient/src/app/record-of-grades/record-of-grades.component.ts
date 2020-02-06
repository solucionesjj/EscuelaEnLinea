import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-record-of-grades',
  templateUrl: './record-of-grades.component.html',
  styleUrls: ['./record-of-grades.component.css']
})
export class RecordOfGradesComponent implements OnInit {

  idAcademicLoad: string;
  gradeDefinitionSelected: any = {};
  students: any = [];
  period: string;
  idCourse: string;

  constructor(private route: ActivatedRoute, private crudService: CrudService) {
  }

  ngOnInit() {
    this.idAcademicLoad = this.route.snapshot.paramMap.get('id');
    this.loadAcademicLoadInfo();
    this.idCourse = this.gradeDefinitionSelected.idCourse;
    this.period = this.gradeDefinitionSelected.period;
  }

  async loadAcademicLoadInfo() {
    const query = `select 
    Users.name,
    Users.surname,
    Courses.year,
    Courses.course,
    Courses.id as idCourse,
    Areas.area,
    Matters.matter,
    AcademicLoads.hoursPerWeek
  from AcademicLoads
  inner join Courses
    on AcademicLoads.idCourse = Courses.id
  inner join Matters
    on AcademicLoads.idMatter = Matters.id
  inner join Areas
    on Matters.idArea = Areas.id
  inner join Users
    on AcademicLoads.idTeacher = Users.id
  where AcademicLoads.id = `+ this.idAcademicLoad;
    this.crudService.model = 'AcademicLoad';
    const result = await this.crudService.getDynamicQuery(query);
    if (result.result) {
      if (result.data) {
        this.gradeDefinitionSelected = result.data[0];
      } else {
        console.log('No se encontraron datos.');
      }
    } else {
      console.log(result.message);
    }
  }

  async loadStudents() {
    const query = `select Users.id as idStudent,
    Users.name,
      Users.surname
  from Matriculations
  inner join Users
    on Matriculations.idStudent = Users.id
  where Matriculations.idCourse = `+ this.idCourse + `
  order by Users.name, Users.surname`;
    this.crudService.model = 'Matriculation';
    const result = await this.crudService.getDynamicQuery(query);
    console.log(result.data)
    if (result.result) {
      if (result.data) {
        this.students = result.data;
      } else {
        console.log('No se encontraron datos.');
      }
    } else {
      console.log(result.message);
    }
  }
}
