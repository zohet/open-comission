import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public changeType: string = "password";
  public visibilityIcon: string = "visibility";
  public isPasswordVisible: boolean = false;
  public isLoginIn: boolean = false;
  constructor(private _formBuilder: FormBuilder,
              private _router: Router,
              private _authService: AuthService) { }
  ngOnInit() {    
    this.createsLoginForm();
  }
  public createsLoginForm( ): void { 
    this.loginForm =  this._formBuilder.group({
      emailFormControl:['', Validators.compose([Validators.required, Validators.email, Validators.minLength(8)])],
      passwordFormControl: ['', Validators.required],
    });
  }
  public loginToAccountWithEmailAndPassword( ): void { 
    this.isLoginIn = true;
    const loginForm = this.loginForm.value;
    const loginUserModel = { 
        email: loginForm.emailFormControl as string,
        password: loginForm.passwordFormControl as string
    }
    this._authService.loginWithEmailAndPassword(loginUserModel);
  }
  public togglePasswordDisplay(){ 
    this.isPasswordVisible = !this.isPasswordVisible;
    if(!this.isPasswordVisible){
      this.changeType = "password";
      this.visibilityIcon = "visibility"
    }
    else { 
      this.changeType = "text";
      this.visibilityIcon = "visibility_off"
    } 
  }
}
