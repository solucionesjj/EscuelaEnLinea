import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { PeriodService } from '../services/period.service';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-record-of-grades',
  templateUrl: './record-of-grades.component.html',
  styleUrls: ['./record-of-grades.component.css']
})
export class RecordOfGradesComponent implements OnInit {

  idAcademicLoad: string;
  gradeDefinitionSelected: any = {};
  students: any = [];
  actualGrades: any = [];
  period: string;
  idCourse: string;
  grades: any = [];
  smallDateFormat: string;

  constructor(private route: ActivatedRoute, private crudService: CrudService, private periodService: PeriodService) {
    this.smallDateFormat = environment.smallDateFormat;
    this.idAcademicLoad = this.route.snapshot.paramMap.get('id');
    this.loadAcademicLoadInfo().then((value) => {
      this.idCourse = this.gradeDefinitionSelected.idCourse;
      this.loadStudents();
    });
    this.loadPeriodInfo().then((value) => {
      this.loadGrades().then((value) => {
        this.loadActualGrades();
      })
    });
  }

  ngOnInit() {
  }

  async loadPeriodInfo() {
    this.period = await this.periodService.get();
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
    this.students = [];
    const query = `select Users.id as idStudent,
    Users.name,
      Users.surname,
      Users.identificationDocument
  from Matriculations
  inner join Users
    on Matriculations.idStudent = Users.id
  where Matriculations.idCourse = `+ this.idCourse + `
  order by Users.surname, Users.name`;
    this.crudService.model = 'Matriculation';
    const result = await this.crudService.getDynamicQuery(query);
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

  async loadGrades() {
    const query = `select 
        GradeDefinitions.id, 
        GradeDefinitions.grade, 
        GradeDefinitions.dueDate,
        GradeDefinitions.description, 
        GradeDefinitions.weight 
      from GradeDefinitions 
      where idAcademicLoad = `+ this.idAcademicLoad + `
        and period = `+ this.period + `
      order by dueDate asc`;
    this.crudService.model = 'GradeDefinition';
    const result = await this.crudService.getDynamicQuery(query);
    if (result.result) {
      if (result.data) {
        this.grades = result.data;
      } else {
        console.log('No se encontraron datos.');
      }
    } else {
      console.log(result.message);
    }
  }

  getAverage (idStudent:number) {
    let sumOfGrades: number = 0;
    let gradesCount: number = 0;
    let average = 0;
    this.actualGrades.forEach(gradeInformation => {      
      if (gradeInformation.idStudent === idStudent) {
        gradesCount++;
        sumOfGrades = sumOfGrades + parseFloat(gradeInformation.grade);
      }
    });
    if(gradesCount > 0){
      average = sumOfGrades / gradesCount;
    }
    return average.toFixed(2);
  }

  async applyGrade(idGradeDefinition: number, idStudent: number, grade: number) {
    if (grade) {
      if (grade >= 0 && grade <= 5) {
        let idGradeInformation = 0;
        let gradeInformation: any = {};
        let result: any = {};
        this.crudService.model = 'GradeInformation'

        gradeInformation.idGradeDefinition = idGradeDefinition;
        gradeInformation.idStudent = idStudent;
        gradeInformation.period = this.period;
        gradeInformation.grade = grade;
        idGradeInformation = this.getActualIdGradeInformation(idGradeDefinition, idStudent);
        // Grade exists, update it
        if (idGradeInformation > 0) {
          gradeInformation.id = idGradeInformation;
          result = await this.crudService.update(gradeInformation);
          if(result.result) {     
            console.log(result.message)
          }
        } else {
          // Grade not exists, insert it
          result = await this.crudService.add(gradeInformation);
          if(result.result) {
            console.log(result.message)
          }
        }  
        this.loadActualGrades().then((value) => {
          let htmlObject = '#averageStudent_'+idStudent;
          let average = this.getAverage(idStudent)
          console.log(htmlObject)
          console.log(average)
          $(htmlObject).val(average);  
        });      
      }
    }


  }

  getActualIdGradeInformation(idGradeDefinitions: number, idStudent: number): number {
    let idGradeInformations = 0;
    this.actualGrades.forEach(gradeInformation => {
      if (gradeInformation.idGradeDefinitions === idGradeDefinitions) {
        if (gradeInformation.idStudent === idStudent) {
          idGradeInformations = gradeInformation.idGradeInformations;
        }
      }
    });
    return idGradeInformations;
  }

  getActualGrade(idGradeDefinitions: number, idStudent: number): number {
    let grade;
    this.actualGrades.forEach(gradeInformation => {
      if (gradeInformation.idGradeDefinitions === idGradeDefinitions) {
        if (gradeInformation.idStudent === idStudent) {
          grade = gradeInformation.grade
        }
      }
    });
    return grade;
  }

  async loadActualGrades() {
    const query = `select GradeDefinitions.id as idGradeDefinitions,
    GradeInformations.idStudent,
    GradeInformations.grade,
    GradeInformations.id as idGradeInformations
    from AcademicLoads
    inner join GradeDefinitions
      on GradeDefinitions.idAcademicLoad = AcademicLoads.id
    inner join GradeInformations
      on GradeInformations.idGradeDefinition = GradeDefinitions.id
    where AcademicLoads.id = `+ this.idAcademicLoad + `
        and GradeDefinitions.period = `+ this.period;
    this.crudService.model = 'GradeDefinition';
    const result = await this.crudService.getDynamicQuery(query);
    if (result.result) {
      if (result.data) {
        this.actualGrades = result.data;
      } else {
        console.log('No se encontraron datos.');
      }
    } else {
      console.log(result.message);
    }
  }
}
