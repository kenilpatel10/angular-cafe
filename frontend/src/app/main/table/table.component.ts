import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonpClientBackend } from '@angular/common/http';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  listForm!: FormGroup;
  categories:any=[];
OrderList:any=[];
localItems:any;
products:any;
  constructor(private api: ApiService,private formBuilder: FormBuilder,private toast : NgToastService,private router: Router) { 
    // this.localItems = localStorage.getItem("order");
    // this.OrderList= JSON.parse(this.localItems)
    // console.log("list",this.OrderList)
  }

  ngOnInit(): void {
    this.localItems = localStorage.getItem("order");
     this.OrderList= JSON.parse(this.localItems)
     console.log("list",this.OrderList)
    this.api.getCategories().subscribe((res)=>{
      this.categories= res.category;
      // console.log( this.categories)
    })
    this.api.getProducts().subscribe((res)=>{
      this.products= res.products;
      // console.log( this.products)
    })
    this.listForm= this.formBuilder.group({
      category:[''],
      item:[''],
      qty:[''],
      itemPrice:[''],
      addOns:[''],
      tableId:[  localStorage.getItem("tableId")],
      tableName:[localStorage.getItem("tableName")]

  });
    
  }
add:any=[];
add1:any=[];
  AddToList(){
    this.add.push(this.listForm.value) ;
     localStorage.setItem("order",JSON.stringify(this.add))
     this.localItems = localStorage.getItem("order");
     this.OrderList= JSON.parse(this.localItems)
     console.log("list",this.OrderList)
  }
getOrderList(){
  localStorage.getItem("order");
}
}
