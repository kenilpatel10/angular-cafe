import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private api: ApiService,private formBuilder: FormBuilder,private toast : NgToastService,private router: Router) { }

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
