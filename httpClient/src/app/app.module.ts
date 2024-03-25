import { UserMatriculationComponent } from './user/user-matriculation/user-matriculation.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AreaComponent } from './area/area.component';
import { MatterComponent } from './matter/matter.component';
import { CrudComponent } from './crud/crud.component';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { AcademicLoadComponent } from './academic-load/academic-load.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { LoadUsersComponent } from './load-users/load-users.component';
import { ParameterComponent } from './parameter/parameter.component';
import { FilterPipe } from './pipes/filter.pipe';
import { UserGroupComponent } from './user-group/user-group.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { GradeDefinitionComponent } from './grade-definition/grade-definition.component';
import { RecordOfGradesComponent } from './record-of-grades/record-of-grades.component';
import { CourseDetailsComponent } from './course/course-details/course-details.component';
import { PermissionComponent } from './permission/permission.component';
import { SectionComponent } from './section/section.component';
import { GroupComponentComponent } from './group-component/group-component.component';
import { GrantPermissonComponent } from './grant-permisson/grant-permisson.component';
import { PerformanceComponent } from './performance/performance.component';
import { PerformanceDefinitionComponent } from './performance-definition/performance-definition.component';
import { LoadingComponent } from './loading/loading.component';
import { SchoolInformationComponent } from './school-information/school-information.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { ReportCardV2Component } from './report-card-v2/report-card-v2.component';
import { ReportCardConfigComponent } from './report-card-config/report-card-config.component';
import { NgxPrintModule } from 'ngx-print';
import { MenuComponent } from './menu/menu.component';
import { GradeComponent } from './grade/grade.component';
import { ValorativeResumeComponent } from './valorativeResume/valorativeResume.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { StudentsInformationComponent } from './students-information/students-information.component';
import { AcademicInformationComponent } from './academic-information/academic-information.component';
import { RadicadorValoracionesFinalesComponent } from './radicador-valoraciones-finales/radicador-valoraciones-finales.component';
import { InformeConsolidadoFinalComponent } from './informe-consolidado-final/informe-consolidado-final.component';
import { CertificadoComponent } from './certificado/certificado.component';
import { ConstanciaComponent } from './constancia/constancia.component';
import { GradeDefinitionErrorComponent } from './grade-definition-error/grade-definition-error.component';
import { DatePipe } from '@angular/common';
import { LegalGuardianQualifyCatalogComponent } from './legal-guardian-qualify-catalog/legal-guardian-qualify-catalog.component';
import { LegalGuardianQualifyComponent } from './legal-guardian-qualify/legal-guardian-qualify.component';
import { AspectsComponent } from './aspects/aspects.component';


// TODO definir scope para consultas a Google.
// const googleLoginOptions: LoginOpt = {
//   scope: 'profile email'
// };
// https://github.com/google/google-api-javascript-client#gapiauth2clientconfig

export function provideConfig() {
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('910568189242-k4evb88o5r24v6d40egt2kdd6qci3daa.apps.googleusercontent.com')
    }
  ]);
  return config;
}


@NgModule({
   declarations: [
      AppComponent,
      CourseComponent,
      AreaComponent,
      MatterComponent,
      CrudComponent,
      UserComponent,
      GroupComponent,
      AcademicLoadComponent,
      LandingPageComponent,
      LayoutComponent,
      DashboardComponent,
      PageNotFoundComponent,
      LoadUsersComponent,
      ParameterComponent,
      FilterPipe,
      UserGroupComponent,
      GradeDefinitionComponent,
      UserMatriculationComponent,
      UserDetailsComponent,
      RecordOfGradesComponent,
      CourseDetailsComponent,
      PermissionComponent,
      SectionComponent,
      GroupComponentComponent,
      GrantPermissonComponent,
      PerformanceComponent,
      PerformanceDefinitionComponent,
      LoadingComponent,
      SchoolInformationComponent,
      ReportCardComponent,
      ReportCardV2Component,
      ReportCardConfigComponent,
      MenuComponent,
      GradeComponent,
      ValorativeResumeComponent,
      StudentsInformationComponent,
      AcademicInformationComponent,
      RadicadorValoracionesFinalesComponent,
      InformeConsolidadoFinalComponent,
      CertificadoComponent,
      ConstanciaComponent,
      GradeDefinitionErrorComponent,
      LegalGuardianQualifyCatalogComponent,
      LegalGuardianQualifyComponent,
      AspectsComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      SocialLoginModule,
      NgxPrintModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        disableTimeOut: false,
        positionClass: 'toast-top-center',
        closeButton: true
      }),
   ],
   providers: [DatePipe,
     {
       provide: AuthServiceConfig,
       useFactory: provideConfig
     }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
