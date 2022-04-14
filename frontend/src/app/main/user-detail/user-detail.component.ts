import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  detailForm!: FormGroup;
  OrderList: any = [];
  OrderList1: any = [];
  localItems: any;
  constructor( private dialogRef: MatDialogRef<UserDetailComponent>,private router: Router, private toast: NgToastService,private formBuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.localItems = localStorage.getItem('order');
 
      this.OrderList = JSON.parse(this.localItems);
      this.OrderList1 = this.OrderList.filter((i: any) => {
        return i.tableName == localStorage.getItem('tableName');
      });
    this.detailForm = this.formBuilder.group({
      customerName:['',Validators.required],
      phone:['',[Validators.required ,Validators.maxLength(10),Validators.minLength(10)]],
      orderItems:[this.OrderList1],
      totalPrice:[localStorage.getItem('total')],
      createdAt:[Date.now()]

    })
  }
  getTotalCost() {
    return this.OrderList1.map((t: any) => t.itemPrice * t.qty).reduce(
      (acc: any, value: any) => acc + value,
      0
    );
  }
  clearList() {

    console.log(this.OrderList)
    let data= this.OrderList.filter((x: any) => {
    return  x.tableName !== localStorage.getItem('tableName')
    });

  console.log("s",data)
  localStorage.setItem('order', JSON.stringify(data));
  localStorage.getItem('order');

}
  sendOrder(){
    if(this.detailForm.valid){
      if(window.confirm("Make Sure That You Have Completed Your Order")){
        this.localItems = localStorage.getItem('order');
        this.OrderList = JSON.parse(this.localItems);
        this.OrderList1 = this.OrderList.filter((i: any) => {
          return i.tableName == localStorage.getItem('tableName');
        });
       let total= this.getTotalCost();
       this.api.postBill(this.detailForm.value).subscribe((res) => {
    
        console.log(res);
       })
       this.detailForm.reset();
       this.dialogRef.close();
       this.clearList();
       this.router.navigate(['main'])
      }
  
  
    }
    }
   
}
