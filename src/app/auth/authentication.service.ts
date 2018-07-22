import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
// import * as firebase from 'firebase/app';
import { User,Administrator, Promoter , Supervisor } from '../models/user';
import 'rxjs/add/operator/switchMap';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class AuthService {
  admin: Observable<Administrator>;
  public loginFormErrorsCode: any;
  private employeeRef: AngularFirestoreDocument<Supervisor | Promoter>;  
  public signupFormErrorsCode: any;
  public authState: any = null;
  constructor(private _snackBar: MatSnackBar,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
                this.afAuth.authState.subscribe((auth) => {
                   this.authState = auth
              }); 
  }
  public createUserWithEmailAndPassword(administrator: Administrator) {
    return this.afAuth.auth.createUserWithEmailAndPassword(administrator.email,administrator.password)
               .then(admin => {
                 this.setAdministratorToDatabase(admin,administrator.name);
                 this.router.navigate(['/settings']);
               }).catch((error) => {
                this.signupFormErrorsCode = error.code;
                switch(this.signupFormErrorsCode){
                    case 'auth/email-already-in-use':
                           this.showSnackBarForNotifications('Este correo electrónico ya ha sido registrado.');
                           break;
                    case 'auth/invalid-email':
                           this.showSnackBarForNotifications('Este correo electrónico no es válido, intenta con otro.');
                           break;
                    case 'auth/weak-password':
                           this.showSnackBarForNotifications('La contraseña no es muy fuerte ¡Intenta con otra contraseña!');
                           break;
                    default: 
                           return;
                }
              });
  }
  public setAdministratorToDatabase(admin, adminName) {
    const userRef: AngularFirestoreDocument<Administrator> = this.afs.doc(`administrators/${admin.uid}`);
    const data: Administrator = {
      uid: admin.uid,
      name: adminName,
      email: admin.email || null,
      isAdmin: true
    }
    return userRef.set(data);
  }
  public createEmployeeWithEmailAndPassword(employee: Supervisor){
    return this.afAuth.auth.createUserWithEmailAndPassword(employee.email,employee.password)
               .then(user => {
                    this.setEmployeeToDatabase(user,employee);
                    if(employee.employeeKey === 'supervisor'){
                      this.router.navigate(['/supervisors']);
                      setTimeout(this.showSnackBarForNotifications('Supervisor Creado'), 3000);
                    }
                    else if (employee.employeeKey === 'promoter'){
                      this.router.navigate(['/promoters']);       
                      setTimeout(this.showSnackBarForNotifications('Promotor Creado'), 3000);                                     
                    }
               }).catch((error) => {
                this.signupFormErrorsCode = error.code;
                switch(this.signupFormErrorsCode){
                    case 'auth/email-already-in-use':
                           this.showSnackBarForNotifications('Este correo electrónico ya ha sido registrado.');
                           break;
                    case 'auth/invalid-email':
                           this.showSnackBarForNotifications('Este correo electrónico no es válido, intenta con otro.');
                           break;
                    case 'auth/weak-password':
                           this.showSnackBarForNotifications('La contraseña no es muy fuerte ¡Intenta con otra contraseña!');
                           break;
                    default: 
                           return;
                }
              });
  }
  public setEmployeeToDatabase(user,employee: Supervisor | Promoter ) {
    const data: Supervisor | Promoter  = {
      uid: user.uid,
      email: employee.email,
      name:  employee.name ,
      birthDate: employee.birthDate ,
      city: employee.city,
      state: employee.state ,  
      address: employee.address,                      
      contractDateBegin: employee.contractDateBegin,             
      contractDateExp: employee.contractDateExp,
      postalCode: employee.postalCode,
      image: employee.image,
      employeeKey: employee.employeeKey
    }
    if(employee.employeeKey === 'supervisor'){
      this.employeeRef = this.afs.doc(`supervisors/${user.uid}`)
      return this.employeeRef.set(data);
    }
    else if(employee.employeeKey === 'promoter') { 
      this.employeeRef = this.afs.doc(`promoters/${user.uid}`)
      return this.employeeRef.set(data);
    }
  }
  public loginWithEmailAndPassword(_userloginModel: User) {
    this.afAuth.auth.signInWithEmailAndPassword(_userloginModel.email,_userloginModel.password)
        .then( user => {
              console.log(user.uid);
              this.router.navigate(['/']);
        }).catch(
          (error) =>{
              this.loginFormErrorsCode =  error.code;
              switch(this.loginFormErrorsCode){
                  case 'auth/wrong-password':
                       this.showSnackBarForNotifications('Contraseña Incorrecta, vuelve a intentarlo.');
                       break;
                  case 'auth/user-not-found':
                       this.showSnackBarForNotifications('El usuario con este email no ha sido encontrado.');
                       break;
                  default: 
                      return;
              }
          } 
      );
  }
  public getAdministratorDocument(uid): Observable<Administrator>{
    return  this.afs.doc(`administrators/${uid}`).valueChanges();
  }
  public showSnackBarForNotifications(message: string){ 
    this._snackBar.open(message, "OK", {
        duration: 6000,
    });
  }
  public logoutUser() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
  get authUid(): string { 
		return this.authState.uid
	}
}