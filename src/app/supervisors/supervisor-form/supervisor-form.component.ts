import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/authentication.service';
import { FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { Supervisor } from '../../models/user';
import * as moment from 'moment';
@Component({
  selector: 'app-supervisor-form',
  templateUrl: './supervisor-form.component.html',
  styleUrls: ['./supervisor-form.component.css']
})
export class SupervisorFormComponent implements OnInit {
  public registrateSupervisorForm: FormGroup;  
  public showErrowForm: boolean = false;
  public generatedEmployeeKey: string = '';
  public generatedPasswordEmployee: string = '';
  constructor(public _authService: AuthService, public _formBuilder: FormBuilder) { }
  ngOnInit() {
    this.createForm();    
  }
  public createForm( ): void {
    this.registrateSupervisorForm =  this._formBuilder.group({
             emailFormControl:['', Validators.compose([Validators.required, Validators.email])],
             nameFormControl:['', Validators.required], 
             birthDateFormControl: ['', Validators.required],   
             cityFormControl: ['', Validators.required],
             stateFormControl: ['', Validators.required],  
             addressFormControl:['', Validators.required],                      
             contractDateBeginFormControl: ['', Validators.required],             
             contractDateExpFormControl: ['', Validators.required],
             postalCodeFormControl: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])],             
             curpFormControl:['', Validators.compose([Validators.required, Validators.minLength(18), Validators.maxLength(18)])],             
             nssFormControl:['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],            
             rfcFormControl:['', Validators.compose([Validators.required, Validators.minLength(13), Validators.maxLength(13)])],
             imageFormControl: ['', Validators.required],
             employeeTypeFormControl: ['', Validators.required ]                     
      });
   } 
   public registerAccountWithEmailAndPassword( ): void { 
    if(this.registrateSupervisorForm.valid && this.generatedPasswordEmployee !=''){     
          const formModel = this.registrateSupervisorForm.value;
          const supervisorModel: Supervisor = { 
          email: formModel.emailFormControl as string,
          name:  formModel.nameFormControl as string,
          birthDate: formModel.birthDateFormControl as Date,
          city: formModel.cityFormControl as string,
          state: formModel.stateFormControl as string,  
          address: formModel.addressFormControl as string,                      
          curp: formModel.curpFormControl as string,
          contractDateBegin: formModel.contractDateBeginFormControl as Date,             
          contractDateExp: formModel.contractDateExpFormControl as Date,
          postalCode: formModel.postalCodeFormControl as string,             
          nss:formModel.nssFormControl as string,            
          rfc: formModel.rfcFormControl as string,
          image: formModel.imageFormControl as string,
          employeeKey: formModel.employeeTypeFormControl as string, 
          password: this.generatedPasswordEmployee
      }
      this._authService.createEmployeeWithEmailAndPassword(supervisorModel)
      .then(e => console.log(e));
    }
    else if(this.registrateSupervisorForm.valid && this.generatedPasswordEmployee===''){
      this.showErrowForm = true
    }
  }
  public generatePassword(){
     const name: string = this.registrateSupervisorForm.controls.nameFormControl.value;
     const db: string =  this.registrateSupervisorForm.controls.birthDateFormControl.value;
     const formattedDB =  moment(db).format('l').split('/');
     const nameP: string[] = name.split(" ");
     this.generatedPasswordEmployee = nameP[0].substr(0,3) + nameP[1].substr(0,3) + formattedDB[0] + formattedDB[1] + formattedDB[2];
    }
}
