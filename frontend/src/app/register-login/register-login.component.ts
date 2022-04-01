import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    
  }
  login(){
    this.router.navigate(['login']);

  }
  register(){
    this.router.navigate(['register']);

  }

}
