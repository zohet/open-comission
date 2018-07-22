import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication.service';
import { User, Administrator } from '../../models/user';
import { Observable } from 'rxjs/observable';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public admin: Observable<Administrator>;
  constructor(private _auth: AuthService) { }
  ngOnInit() {
    this.getAdministratorData(this._auth.authState.uid);
  }
  public getAdministratorData(uid){
    this.admin = this._auth.getAdministratorDocument(uid);
  }
}