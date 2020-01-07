import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { AreaComponent } from './area/area.component';
import { MatterComponent } from './matter/matter.component';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';


const routes: Routes = [
  {
    path: 'course',
    component: CourseComponent
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
];

@NgModule({
  //imports: [RouterModule.forRoot(routes,{ enableTracing: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
