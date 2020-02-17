import { UserMatriculationComponent } from './user/user-matriculation/user-matriculation.component';
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
import { GradeDefinitionComponent } from './grade-definition/grade-definition.component';
import { RecordOfGradesComponent } from './record-of-grades/record-of-grades.component';
import { CourseDetailsComponent } from './course/course-details/course-details.component';

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
        path: 'recordofgrades/:id',
        component: RecordOfGradesComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'parameter',
        component: ParameterComponent,
        canActivate: [AuthGuardService]
      }
      ,
      {
        path: 'usergroup',
        component: UserGroupComponent,
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
