import { Component, OnInit, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailComponent } from '../user-detail/user-detail.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  listForm!: FormGroup;
  categories: any = [];
  OrderList: any = [];
  localItems: any;
  products: any;
  OrderList1: any = [];
  ProductList: any = [];
  dataSource!: MatTableDataSource<any>;
  displayedData: string[] = ['name', 'category', 'price', 'qty', 'action'];
  updateOn: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  validate: boolean = true;
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.localItems = localStorage.getItem('order');
  
    if (this.localItems !== null) {
      this.OrderList = JSON.parse(this.localItems);
      this.OrderList1 = this.OrderList.filter((i: any) => {
        return i.tableName == localStorage.getItem('tableName');
      });
    }
    this.api.getCategories().subscribe((res) => {
      this.categories = res.category;
    });
    console.log("cat",this.categories)
    this.api.getProducts().subscribe((res) => {
      this.products = res.products;
      this.ProductList = this.products.filter((i: any) => {
        return i.category === localStorage.getItem('category');
      });
    });
    this.dataSource = new MatTableDataSource(this.OrderList1);
    this.dataSource.sort = this.sort;
    this.getTotalCost();
   
    this.listForm = this.formBuilder.group({
      id: Date.now(),
      category: ['', Validators.required],
      item: ['', Validators.required],
      qty: ['', Validators.required],
      itemPrice: ['', Validators.required],
      addOns: [''],
      tableId: [localStorage.getItem('tableId')],
      tableName: [localStorage.getItem('tableName')],
    });
  }

  add: any = [];
  AddToList(name: any) {
    if (this.listForm.valid) {
         let add = JSON.parse(this.localItems) || [];
      let exist = false;
      for(let x of this.OrderList1){
        if(this.listForm.value.item === x.item){
          alert("Item Already Exists")
          exist= true
          break;
        }}
      console.log(this.listForm.value.item);
      console.log(this.OrderList1);
   
if(!exist){

  add.push(this.listForm.value);
  localStorage.setItem('order', JSON.stringify(add));
  this.toast.success({
    detail: 'Success Message',
    summary: 'Order Added Successfully',
    duration: 4000,
  });

}
     
this.getOrderList();  
    
    }
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
  openDialog() {
    localStorage.setItem('total', this.getTotalCost());

    this.dialog.open(UserDetailComponent);
  }
  UpdateToList(id: any) {
    this.updateOn = false;
    if (this.listForm.valid) {
      const old = JSON.parse(this.localItems);
      old.splice(old.findIndex((a: any) => a.id === id));
      old.push(this.listForm.value);
      localStorage.setItem('order', JSON.stringify(old));
      this.toast.success({
        detail: 'Success Message',
        summary: 'Order Updated Successfully',
        duration: 4000,
      });
      this.getOrderList();
    }
  }
  getTotalCost() {
    return this.OrderList1.map((t: any) => t.itemPrice * t.qty).reduce(
      (acc: any, value: any) => acc + value,
      0
    );
  }
  onProductClick(id: any) {
    this.api.getSingleProduct(id).subscribe({
      next: (res) => {
        this.listForm.controls['qty'].setValue(res.product.quantity);
        this.listForm.controls['itemPrice'].setValue(res.product.price);
      },
    });
  }
  increaseQuantity(id: any, quantity: any) {
    let newQty = quantity + 1;
    if (quantity <= 5) {
      // this.listForm.controls['qty'].setValue(newQty);
    }
  }

  decreaseQuantity(id: any, quantity: any) {
    let newQty = quantity - 1;
    if (1 >= quantity) return console.log('dec', newQty);
  }
  setCategory(cat: any) {
    console.log(cat);
    localStorage.setItem('category', cat.name);
    this.api.getProducts().subscribe((res) => {
      this.products = res.products;
      this.ProductList = this.products.filter((i: any) => {
        return (
          i.category === localStorage.getItem('category') &&
          i.status === true
          
        );
      });
    });
  }
  getOrderList() {
    this.localItems = localStorage.getItem('order');
    this.OrderList = JSON.parse(this.localItems);
    this.OrderList1 = this.OrderList.filter((i: any) => {
      return i.tableName == localStorage.getItem('tableName');
    });
    this.dataSource = new MatTableDataSource(this.OrderList1);
    this.dataSource.sort = this.sort;
  }
  updateOrderList(data: any) {
    this.updateOn = true;
    this.listForm.controls['item'].setValue(data.item);
    this.listForm.controls['category'].setValue(data.category);
    this.listForm.controls['qty'].setValue(data.qty);
    this.listForm.controls['itemPrice'].setValue(data.itemPrice);
  }

  deleteOrder(id: any) {
    if (window.confirm('are you sure ??')) {
      let data = JSON.parse(this.localItems);
      const index = data.indexOf();
      data.splice(index, 1);
      localStorage.setItem('order', JSON.stringify(data));
      this.getOrderList();
      this.toast.success({
        detail: 'Success Message',
        summary: 'Order Deleted Successfully',
        duration: 4000,
      });
    }
  }
}
