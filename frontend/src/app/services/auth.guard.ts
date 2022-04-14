import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private api : ApiService, private router: Router){

  }
  canActivate(){
    if(this.api.isLoggedIn()){
      return true;
    }
    alert("Please Login First to Access This...")
  this.router.navigate([''])
  return false;
  }
  
}
