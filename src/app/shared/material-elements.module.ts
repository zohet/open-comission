import { NgModule } from '@angular/core';
import {  
          MatButtonModule,
          MatInputModule,
          MatIconModule,
          MatTooltipModule,
          MatSelectModule,
          MatRadioModule,
          MatNativeDateModule,
          MatDatepickerModule,
          MatSnackBarModule,
          MatTableModule,
          MatProgressSpinnerModule,
          MatPaginatorModule,
          MatTabsModule,
          MatCardModule
        } 
        from '@angular/material';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/authentication.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NotFoundComponent } from './not-found/not-found.component';
import { EventFormComponent } from './event-form/event-form.component';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatRadioModule,
    MatNativeDateModule,    
    MatDatepickerModule,
    MatSnackBarModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatCardModule
  ], 
  declarations: [ ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatRadioModule,
    MatNativeDateModule,
    MatSnackBarModule,   
    MatDatepickerModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatCardModule        
   ],
  providers: [
    AuthService
  ]
})
export class MaterialElementsModule { }