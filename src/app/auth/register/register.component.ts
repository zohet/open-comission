import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { AuthService } from '../authentication.service';
import { Administrator } from '../../models/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registrationForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _authService: AuthService) { }
  ngOnInit() {
    this.createForm();
  }
  public createForm( ): void {
    this.registrationForm =  this._formBuilder.group({
             emailFormControl:['', Validators.compose([Validators.required, Validators.email])],
             nameFormControl:['', Validators.required],
             passwordFormControl: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
      });
   } 
  public registerAccountWithEmailAndPassword( ): void { 
    const formModel = this.registrationForm.value;
    const administratorModel: Administrator = { 
        email: formModel.emailFormControl as string,
        name:  formModel.nameFormControl as string,
        password: formModel.passwordFormControl as string
    }
    this._authService.createUserWithEmailAndPassword(administratorModel)
        .then(e => console.log(e));
  }
}