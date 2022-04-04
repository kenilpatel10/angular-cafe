import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private toast: NgToastService,
    private api: ApiService,
    public formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      name: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ],
      ],
    });
  }
  show: boolean = false;

  password() {
    this.show = !this.show;
  }
  registerUser() {
    if (this.registerForm.valid) {

      this.api.postUser(this.registerForm.value).subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'Success Message',
            summary: 'User Registered Successfully',
            duration: 4000,
          });
          console.log("status",res.status)
    
            this.registerForm.reset();
            this.router.navigate(['warning']);
            console.log("if",res.status)
         
        
        },
        error: (error: any) => {
          this.toast.error({
            detail: 'Error Message',
            summary: error,
            duration: 4000,
          });
        },
      });
    }
  }
}
