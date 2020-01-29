import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudComponent } from '../crud/crud.component';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-grade-definition',
  templateUrl: './grade-definition.component.html',
  styleUrls: ['./grade-definition.component.css']
})
export class GradeDefinitionComponent implements OnInit {

  idAcademicLoad: string;
  academicLoadSelected: any = {};
  academicLoadNotes
  note: any = {};

  constructor(private route: ActivatedRoute, private crudService: CrudService) {
  }



  ngOnInit() {
    this.idAcademicLoad = this.route.snapshot.paramMap.get('id');
    this.lodaAcademicLoadInfo();
    this.loadAcademicLoadNotes();
  }
  
  async loadAcademicLoadNotes() {

  }

  async lodaAcademicLoadInfo() {

    const query = `select Courses.course, Areas.area, Matters.matter, Users.name,Users.surname, AcademicLoads.hoursPerWeek 
from AcademicLoads  
inner join Courses 
	on Courses.id = AcademicLoads.idCourse 
inner join Matters 
	on Matters.id = AcademicLoads.idMatter 
inner join Areas 
	on Areas.id = Matters.idArea 
inner join Users 
  on Users.id = AcademicLoads.idTeacher 
where AcademicLoads.id = `+ this.idAcademicLoad;
    this.crudService.model = 'AcademicLoad';
    const result = await this.crudService.getDynamicQuery(query);
    if (result.result) {
      if (result.data.length > 0) {
        this.academicLoadSelected = result.data[0];
      } else {
        console.log('No se encontraron datos.');
      }
    } else {
      console.log(result.message);
    }
  }


  /*
    idAcademicLoad: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
      references: {
        model: 'AcademicLoad',
        key: 'id'
      }
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      required: true,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    grade: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: 'Sin descripción.'
    }
  
  */


}
