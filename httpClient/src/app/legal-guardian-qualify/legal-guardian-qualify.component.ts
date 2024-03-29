import { Component } from '@angular/core';
import { CourseService } from '../services/course.service';
import { PeriodService } from '../services/period.service';
import { LegalGuardianQualifyService } from '../services/legal-guardian-qualify.service';
import { LegalGuardianQualifyCatalogService } from '../services/legal-guardian-qualify-catalog.service';
import { AlertService } from '../services/alert.service';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-legal-guardian-qualify',
  templateUrl: './legal-guardian-qualify.component.html',
  styleUrls: ['./legal-guardian-qualify.component.css']
})
export class LegalGuardianQualifyComponent {
  selectedYear: number = 0;
  courses: any = [];
  loading: boolean = false;
  matriculations: any = [];
  selectedCourse: number = 0;
  informationLoaded: boolean = false;
  loadingInformation: boolean = false;
  actualPeriod: number = 0;
  legalGuardianQualifyCatalog: any = [];
  legalGuardianQualifyData: any = [];

  constructor(
    private courseService: CourseService,
    private periodService: PeriodService,
    private crudService: CrudService,
    private legalGuardianQualifyService: LegalGuardianQualifyService,
    private legalGuardianQualifyCatalogService: LegalGuardianQualifyCatalogService,
    private alertService: AlertService) {
    this.loading = true;
    this.selectedYear = (new Date()).getFullYear();
    courseService
      .getCourses(this.selectedYear.toString())
      .then((result) => {
        result.forEach(element => {
          this.courses.push({ id: element.idCourse, value: element.course });
        });
        periodService.getActualPeriod()
          .then((result) => {
            this.actualPeriod = parseInt(result);
            legalGuardianQualifyCatalogService.getLegalGuardianQualifyCatalog()
              .then((result) => {
                this.legalGuardianQualifyCatalog = result.data;
                this.loading = false;
              });
          });
      });
  }

  async getMatriculations() {
    this.matriculations = [];
    this.informationLoaded = false;
    this.loadingInformation = true;
    this.legalGuardianQualifyService.getMatriculations(this.selectedCourse)
      .then((result) => {
        result.data.forEach(element => {
          this.matriculations.push(
            {
              identificationDocument: element.identificationDocument,
              fullName: element.fullName,
              idMatriculations: element.idMatriculations
            });
        });
        this.legalGuardianQualifyService.getLegalGuardianQualify(this.selectedCourse, this.actualPeriod)
          .then((result) => {
            this.legalGuardianQualifyData = result.data;
            this.informationLoaded = true;
            this.loadingInformation = false;
          });
      });
  }

  async qualification(idMatriculation: number, idLegalGuardianQualifyCatalog: number, actualPeriod: number) {
    const idLegalGuardianQualify = await this.legalGuardianQualifyService.getIdLegalGuardianQualify(idMatriculation, idLegalGuardianQualifyCatalog, actualPeriod);
    if (idLegalGuardianQualify > 0) {
      const result = await this.legalGuardianQualifyService.deleteLegalGuardianQualify(idLegalGuardianQualify);
      if (result.result) {
        this.alertService.success("Datos eliminados correctamente");
      } else {
        this.alertService.danger("Error al eliminar los datos" + result.message);
      }
    } else {
      const result = await this.legalGuardianQualifyService.setLegalGuardianQualify(idMatriculation, idLegalGuardianQualifyCatalog, actualPeriod);
      if (result.result) {
        this.alertService.success("Datos creados correctamente");
      } else {
        this.alertService.danger("Error al crear los datos" + result.message);
      }
    }
    // this.getMatriculations();
  }

  isChecked(idMatriculations: number, idLegalGuardianQualifyCatalog: number, period: number) {
    let result = false;
    this.legalGuardianQualifyData.forEach(data => {
      if (data.idMatriculations == idMatriculations && data.idLegalGuardianQualifyCatalog == idLegalGuardianQualifyCatalog && data.bimestre == period) { result = true; return; }
    });
    return result;
  }




  // getQualityInfo(idMatriculation: number, idLegalGuardianQualifyCatalog: number, actualPeriod: string ) {
  //   let result = false;
  //   result = this.legalGuardianQualifyData.every(qualifyData => {
  //     if(qualifyData.id == idMatriculation && qualifyData.idLegalGuardianQualifyCatalog == idLegalGuardianQualifyCatalog && qualifyData.bimestre == actualPeriod) return true;
  //   });
  //   return result;
  // }

}