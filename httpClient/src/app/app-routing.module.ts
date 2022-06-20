import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { AreaComponent } from './area/area.component';
import { MatterComponent } from './matter/matter.component';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { AcademicLoadComponent } from './academic-load/academic-load.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoadUsersComponent } from './load-users/load-users.component';
import { ParameterComponent } from './parameter/parameter.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserMatriculationComponent } from './user/user-matriculation/user-matriculation.component';
import { GradeDefinitionComponent } from './grade-definition/grade-definition.component';
import { RecordOfGradesComponent } from './record-of-grades/record-of-grades.component';
import { CourseDetailsComponent } from './course/course-details/course-details.component';
import { PermissionComponent } from './permission/permission.component';
import { SectionComponent } from './section/section.component';
import { GroupComponentComponent } from './group-component/group-component.component';
import { PerformanceComponent } from './performance/performance.component';
import { PerformanceDefinitionComponent } from './performance-definition/performance-definition.component';
import { SchoolInformationComponent } from './school-information/school-information.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { ReportCardV2Component } from './report-card-v2/report-card-v2.component';
import { ReportCardConfigComponent } from './report-card-config/report-card-config.component';
import { GradeComponent } from './grade/grade.component';
import { ValorativeResumeComponent } from './valorativeResume/valorativeResume.component';
import { StudentsInformationComponent } from './students-information/students-information.component';
import { AcademicInformationComponent } from './academic-information/academic-information.component';
import { RadicadorValoracionesFinalesComponent } from './radicador-valoraciones-finales/radicador-valoraciones-finales.component';
import { InformeConsolidadoFinalComponent } from './informe-consolidado-final/informe-consolidado-final.component';
import { CertificadoComponent } from './certificado/certificado.component';
import { ConstanciaComponent } from './constancia/constancia.component';
import { GradeDefinitionErrorComponent } from './grade-definition-error/grade-definition-error.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'landingpage',
    pathMatch: 'full'
  },
  {
    path: 'landingpage',
    component: LandingPageComponent
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        canActivate: [AuthGuardService]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'course',
        component: CourseComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'coursedetails/:id',
        component: CourseDetailsComponent ,
        canActivate: [AuthGuardService]
      },
      {
        path: 'area',
        component: AreaComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'matter',
        component: MatterComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'userdetails/:id',
        component: UserDetailsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'usermatriculation/:id',
        component: UserMatriculationComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'loadusers',
        component: LoadUsersComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'group',
        component: GroupComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'academicLoad',
        component: AcademicLoadComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'gradedefinition/:id',
        component: GradeDefinitionComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'gradedefinitionerror',
        component: GradeDefinitionErrorComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'recordofgrades/:id',
        component: RecordOfGradesComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'parameter',
        component: ParameterComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'usergroup',
        component: UserGroupComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'permission',
        component: PermissionComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'section',
        component: SectionComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'groupcomponent',
        component: GroupComponentComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'performance',
        component: PerformanceComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'performanceDefinition',
        component: PerformanceDefinitionComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'schoolInformation',
        component: SchoolInformationComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'reportCard',
        component: ReportCardComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'reportCardV2',
        component: ReportCardV2Component,
        canActivate: [AuthGuardService]
      },
      {
        path: 'reportCardConfig',
        component: ReportCardConfigComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'grade',
        component: GradeComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'valorativeResume',
        component: ValorativeResumeComponent,
        canActivate: [AuthGuardService]
      }
      ,
      {
        path: 'studentsInformation',
        component: StudentsInformationComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'academicInformation',
        component: AcademicInformationComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'RadicadorValoracionesFinales',
        component: RadicadorValoracionesFinalesComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'InformeConsolidadoFinal',
        component: InformeConsolidadoFinalComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'Certificado',
        component: CertificadoComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'Constancia',
        component: ConstanciaComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  //imports: [RouterModule.forRoot(routes,{ enableTracing: true })],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
