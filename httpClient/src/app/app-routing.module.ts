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

// TODO https://codeburst.io/using-angular-route-guard-for-securing-routes-eabf5b86b4d1
const routes: Routes = [
  {
    path: '',
    redirectTo: 'landingpage',
    pathMatch: 'full'
  },
  {
    path: 'landingpage',
    component: LandingPageComponent,
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'course',
        component: CourseComponent,
      },
      {
        path: 'area',
        component: AreaComponent
      },
      {
        path: 'matter',
        component: MatterComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'group',
        component: GroupComponent
      },
      {
        path: 'academicLoad',
        component: AcademicLoadComponent
      }
    ]
  }
];

@NgModule({
  //imports: [RouterModule.forRoot(routes,{ enableTracing: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
