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
        path: 'group',
        component: GroupComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'academicLoad',
        component: AcademicLoadComponent,
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
