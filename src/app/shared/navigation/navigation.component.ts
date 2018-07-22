import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(private _authService: AuthService,
              private _router: Router) { }
  public logout(){
    this._authService.logoutUser();
  }
  ngOnInit() {
  }
  public navigate(route: string ){
    let routeSelected = `/${route}`;
    this._router.navigate([routeSelected]);
  }
}
