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
    console.log("type",typeof(this.OrderList1))
    this.api.getOrders().subscribe({
      next: (res) => {
        this.OrderList= res.orders
        console.log("res",typeof(res.orders))
        this.OrderList1 = this.OrderList.filter((i: any) => {
          return i.tableName == localStorage.getItem('tableName');
        });
        console.log("get order", this.OrderList1)
      }
    })
  // let data= JSON.stringify(this.OrderList1)
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

    console.log(this.OrderList1)
    let data= this.OrderList.filter((x: any) => {
    return  x.tableName !== localStorage.getItem('tableName')
    });

  console.log("s",data)
  localStorage.setItem('order', JSON.stringify(data));
  localStorage.getItem('order');

}
  sendOrder(){
    if(this.detailForm.valid){
      this.OrderList1.forEach((element: any) => {
        this.detailForm.value.orderItems.push(element)
      });
      if(window.confirm("Make Sure That You Have Completed Your Order")){
        console.log("get order12",this.OrderList1)
       console.log("form",this.detailForm.value)
        // const fd = new FormData;
        // fd.append('orderItems',this.OrderList1)
        // fd.append('customerName',this.detailForm.value.customerName)
        // fd.append('phone',this.detailForm.value.phone)
        // fd.append('totalPrice',this.detailForm.value.totalPrice)
        // fd.append('createdAt',this.detailForm.value.createdAt)
       let total= this.getTotalCost();
       this.api.postBill(this.detailForm.value).subscribe((res) => {
    
        console.log("final",res);
       })
       this.detailForm.reset();
       this.dialogRef.close();
      //  this.clearList();
       this.router.navigate(['main'])
      }
  
  
    }
    }
   
}
