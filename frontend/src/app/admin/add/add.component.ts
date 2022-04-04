import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
categoryForm!: FormGroup;
tableForm!: FormGroup;
itemForm!: FormGroup;
categories: any = [];
  constructor(private router: Router,private toast: NgToastService,private formBuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.api.getCategories().subscribe((res) => {
      this.categories = res.category;
      // console.log( this.categories)
    });
this.categoryForm = this.formBuilder.group({
  name:['']
})
this.tableForm = this.formBuilder.group({
  name:['']
})
this.itemForm = this.formBuilder.group({
  name:[''],
  category:[''],
  price:[''],

})
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
addCategory(){
if(this.categoryForm.valid){
  this.api.postCategory(this.categoryForm.value).subscribe({
    next:(res)=>{
      this.toast.success({
        detail: 'Success Message',
        summary: `Category Added Successfully` ,
        duration: 4000,
      });
      this.categoryForm.reset();
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
addItems(){
  if(this.itemForm.valid){
    this.api.postItems(this.itemForm.value).subscribe({
      next:(res)=>{
        this.toast.success({
          detail: 'Success Message',
          summary: `Item Added Successfully` ,
          duration: 4000,
        });
        this.itemForm.reset();
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
addTable(){
  if(this.tableForm.valid){
    this.api.postTable(this.tableForm.value).subscribe({
      next:(res)=>{
        this.toast.success({
          detail: 'Success Message',
          summary: `Table Added Successfully` ,
          duration: 4000,
        });
        this.tableForm.reset();
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
