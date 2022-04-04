import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.css']
})
export class AdminScreenComponent implements OnInit {

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
