import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthService } from '../auth/authentication.service';
import { MaterialElementsModule  } from './material-elements.module';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EventFormComponent } from './event-form/event-form.component';
import { BranchesService } from '../branches/branches.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusComponent } from './status/status.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialElementsModule,
    FormsModule, 
    ReactiveFormsModule
  ], 
  declarations: [
    NavigationComponent,
    FloatingButtonComponent,
    NotFoundComponent,
    EventFormComponent,
    StatusComponent
  ],
  exports: [
    NavigationComponent,
    FloatingButtonComponent,
    EventFormComponent, 
    StatusComponent
  ],
  providers: [
    AuthService,
    BranchesService
  ]
})
export class SharedComponentsModule { }