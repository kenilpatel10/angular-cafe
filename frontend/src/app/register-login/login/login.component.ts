import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private api : ApiService,
    private toast: NgToastService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      email:['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ],
      ],
    })
  }
  show: boolean = false;

  password() {
    this.show = !this.show;
  }

  loginUser(){
    if(this.loginForm.valid){
      this.api.postLogin(this.loginForm.value).subscribe({
        next:(res)=>{
          this.toast.success({
            detail: 'Success Message',
            summary: `${res.role} Logged In successfully` ,
            duration: 4000,
          });
          if(res.status === false){
            this.toast.error({
              detail: 'Error Message',
              summary: "You are not authorized by admin",
              duration: 4000,
            });
            this.router.navigate(['warning'])
          }
          if(res.status === true){
            localStorage.setItem ('token', res.token);
            localStorage.setItem ('name', res.name);
            localStorage.setItem ('id', res.id);
            this.loginForm.reset();
            if(res.role === 'admin'){
              this.router.navigate(['dashboard'])
            }
            if(res.role === 'user'){
              this.router.navigate(['main'])
            }
          }
        
      
         
        },
        error: (error: any) => {
          this.toast.error({
            detail: 'Error Message',
            summary: error,
            duration: 4000,
          });
        },
      })
    }
  }

}
