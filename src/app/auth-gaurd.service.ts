import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor(
    private router: Router,
  ) { }

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot){
    if(localStorage.getItem('token')){
      return state.url.startsWith('/profile') ? true : (this.router.navigate['/'], false);
    } else {
      return state.url.startsWith('/profile') ? (this.router.navigate['/'], false) : true;
    }
  }
}
