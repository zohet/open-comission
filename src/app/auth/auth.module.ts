import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MaterialElementsModule  } from '../shared/material-elements.module';
import { AuthService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './authentication.guard';
import { AuthFollow } from './authentication.follow.guard';
import { SettingsComponent } from './settings/settings.component';
import { SharedComponentsModule } from '../shared/shared-components.module';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule, 
    MaterialElementsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule
   ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    SettingsComponent
],
  exports: [
  ],
  providers: [ 
    AuthService,
    AuthGuard,
    AuthFollow
  ]
})
export class AuthModule { }
