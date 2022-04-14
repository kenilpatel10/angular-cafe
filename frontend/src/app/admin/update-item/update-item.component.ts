import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {
  itemForm!: FormGroup;
 
  categories:any;
  constructor(private dialogRef: MatDialogRef<UpdateItemComponent>,private router: Router, @Inject(MAT_DIALOG_DATA) public editData: any,private toast: NgToastService,private formBuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    console.log("ok",this.editData)
    this.api.getCategories().subscribe((res) => {
      this.categories = res.category;
      // console.log( this.categories)
    });
    this.itemForm = this.formBuilder.group({
      name:[''],
      category:[''],
      price:[''],
    
    })
    if (this.editData) {

      this.itemForm.controls['name'].setValue(this.editData.name);
      this.itemForm.controls['price'].setValue(this.editData.price);
      this.itemForm.controls['category'].setValue(this.editData.category);
    }


  }
updateItem(){
  this.api.updateProduct(this.editData._id, this.itemForm.value).subscribe({
    next: (res) => {
      this.toast.success({
        detail: 'Success Message',
        summary: 'Issue Updated Successfully',
        duration: 4000,
      });
      this.itemForm.reset();
      this.dialogRef.close('update');
    },
    error: () => {
      this.toast.error({
        detail: 'Error Message',
        summary: 'Error While Updating Issue',
        duration: 4000,
      });
    },
  });
}
}
