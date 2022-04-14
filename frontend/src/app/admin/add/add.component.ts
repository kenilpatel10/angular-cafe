import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
products: any = [];
tables: any = [];
  constructor(private router: Router,private toast: NgToastService,private formBuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe((res)=>{
      this.products = res.products;
  
    })
  this.api.getCategories().subscribe((res) => {
      this.categories = res.category;
    });
    this.api.getTables().subscribe((res) => {
      this.tables = res.tables;
      console.log("ppp",this.tables)
    });
this.categoryForm = this.formBuilder.group({
  name:['',Validators.required]
})
this.tableForm = this.formBuilder.group({
  name:['',Validators.required]
})
this.itemForm = this.formBuilder.group({
  name:['',Validators.required],
  category:['',Validators.required],
  price:['',Validators.required],

})
  }
  logOut(){
    if(window.confirm("Are You Sure?? ")){
      localStorage.removeItem('name');
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      localStorage.removeItem('role')
        this.router.navigate([''])
        this.toast.success({
          detail: 'Success Message',
          summary: 'Logged Out Successfully',
          duration: 4000,
        });
    }
      
          }
addCategory(){
if(this.categoryForm.valid){
  let exist = false;
  for(let x of this.categories){
    if(this.categoryForm.value.name === x.name){
      alert("already")
      exist= true
      break;
    }}
    if(!exist){
      this.api.postCategory(this.categoryForm.value).subscribe({
        next:(res)=>{
          this.toast.success({
            detail: 'Success Message',
            summary: `Category Added Successfully` ,
            duration: 4000,
          });
          this.categoryForm.reset();
          this.api.getCategories().subscribe((res) => {
            this.categories = res.category;
          });
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
addItems(){
  if(this.itemForm.valid){
    let exist = false;
    for(let x of this.products){
      if(this.itemForm.value.name === x.name){
        alert("Item Already Exists")
        exist= true
        break;
      }}
      if(!exist){
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
}
addTable(){
  if(this.tableForm.valid){
    let exist = false;
    for(let x of this.tables){
      if(this.tableForm.value.name === x.name){
        alert("Item Already Exists")
        exist= true
        break;
      }}
      if(!exist){
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
}
