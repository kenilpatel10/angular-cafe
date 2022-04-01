import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router,
    private toast: NgToastService) { }
    token:any
  ngOnInit(): void {
    this.token = localStorage.getItem("token")
  }
  show: boolean = false;

  logOut(){

localStorage.clear();
this.router.navigate([''])
this.toast.success({
  detail: 'Success Message',
  summary: 'Logged Out Successfully',
  duration: 4000,
});
  }
}
