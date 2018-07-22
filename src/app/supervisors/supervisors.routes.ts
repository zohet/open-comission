import { NgModule } from '@angular/core';
import { RouterModule, Routes , CanActivate } from '@angular/router';
import { AuthGuard } from '../auth/authentication.guard';
import { SupervisorFormComponent } from './supervisor-form/supervisor-form.component';
const supervisorsRoutes: Routes = [  
    { path: 'new-employee' , component: SupervisorFormComponent, canActivate: [AuthGuard], data: { animation: 'settings' } }    
];
@NgModule({
  imports: [
    RouterModule.forChild(supervisorsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SupervisorsRoutesModule { }