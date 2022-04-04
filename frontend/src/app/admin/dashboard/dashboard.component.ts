import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private toast : NgToastService,private router: Router) { }

  ngOnInit(): void {
  }
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
