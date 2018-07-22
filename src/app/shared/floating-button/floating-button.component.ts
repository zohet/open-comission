import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent implements OnInit {
  @Input('route') routeAsigned: string;
  @Input('tip') toolTipText: string;
  @Input('icon') icon: string; 
  constructor(private _router: Router) { }
  ngOnInit() { }
  public redirecToRoute(route){
    this._router.navigate([`/${route}`])
  }
}
