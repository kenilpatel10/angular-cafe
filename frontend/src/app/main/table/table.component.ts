import { Component, OnInit, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  listForm!: FormGroup;
  tableName: any = localStorage.getItem('tableName');
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
    public loaderService: LoaderService,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getOrderList();

    this.api.getCategories().subscribe((res) => {
      this.categories = res.category;
    });
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
  AddToList() {
    if (this.listForm.valid) {
      let exist = false;

      for (let x of this.OrderList1) {
        if (this.listForm.value.item === x.item) {
          alert('Item Already Exists');
          exist = true;
          break;
        }
      }
      if (!exist) {
        this.api.postOrder(this.listForm.value).subscribe({
          next: (res) => {
            this.toast.success({
              detail: 'Success Message',
              summary: 'Order Added Successfully',
              duration: 4000,
            });
            this.getOrderList();
            console.log('list of data', this.OrderList);
          },
          error: () => {
            this.toast.error({
              detail: 'Error Message',
              summary: 'Error While Adding Order',
              duration: 4000,
            });
          },
        });
      }
    }
    //          let add = JSON.parse(this.localItems) || [];
    //       let exist = false;
    //       for(let x of this.OrderList1){
    //         if(this.listForm.value.item === x.item){
    //           alert("Item Already Exists")
    //           exist= true
    //           break;
    //         }}
    //       console.log(this.listForm.value.item);
    //       console.log(this.OrderList1);

    // if(!exist){

    //   add.push(this.listForm.value);
    //   localStorage.setItem('order', JSON.stringify(add));
    //   this.toast.success({
    //     detail: 'Success Message',
    //     summary: 'Order Added Successfully',
    //     duration: 4000,
    //   });
  }

  clearList() {
    console.log(this.OrderList);
    let data = this.OrderList.filter((x: any) => {
      return x.tableName !== localStorage.getItem('tableName');
    });

    console.log('remove', data);
  }
  openDialog() {
    localStorage.setItem('total', this.getTotalCost());

    this.dialog.open(UserDetailComponent);
  }
  id: any;
  UpdateToList() {
    this.updateOn = false;
    let exist = false;

    for (let x of this.OrderList1) {
      if (this.listForm.value.item === x.item) {
        alert('Item Already Exists');
        exist = true;
        break;
      }
    }
    if (!exist) {
      const isUpdate = this.OrderList1.findIndex((a: any) => {
        a.item === this.listForm.value.item;
      });
      console.log('up', isUpdate);
      if (this.listForm.valid) {
        this.id = localStorage.getItem('updateId');
        const id1 = JSON.parse(this.id);
        console.log('dataid', id1);
        this.api.updateOrder(id1, this.listForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.toast.success({
              detail: 'Success Message',
              summary: 'Updated Successfully',
              duration: 4000,
            });
            this.getOrderList();
          },
          error: () => {
            this.toast.error({
              detail: 'Error Message',
              summary: 'Error While Updateing Order',
              duration: 4000,
            });
          },
        });
      }

      // const old = JSON.parse(this.localItems);
      // old.splice(old.findIndex((a: any) => a.id === id));
      // old.push(this.listForm.value);
      // localStorage.setItem('order', JSON.stringify(old));
      // this.toast.success({
      //   detail: 'Success Message',
      //   summary: 'Order Updated Successfully',
      //   duration: 4000,
      // });
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
  setCategory(cat: any) {
    console.log(cat);
    localStorage.setItem('category', cat.name);
    this.api.getProducts().subscribe((res) => {
      this.products = res.products;
      this.ProductList = this.products.filter((i: any) => {
        return (
          i.category === localStorage.getItem('category') && i.status === true
        );
      });
    });
  }
  getOrderList() {
    this.api.getOrders().subscribe({
      next: (res) => {
        this.OrderList = res.orders;
        this.OrderList1 = this.OrderList.filter((i: any) => {
          return i.tableName == localStorage.getItem('tableName');
        });
        console.log('get data', this.OrderList1);
        this.dataSource = new MatTableDataSource(this.OrderList1);
        this.dataSource.sort = this.sort;
      },
    });
  }
  updateOrderList(data: any) {
    console.log(data._id);
    localStorage.setItem('updateId', JSON.stringify(data._id));
    this.updateOn = true;
    this.listForm.controls['item'].setValue(data.item);
    this.listForm.controls['category'].setValue(data.category);
    this.listForm.controls['qty'].setValue(data.qty);
    this.listForm.controls['itemPrice'].setValue(data.itemPrice);
  }

  deleteOrder(id: any) {
    if (window.confirm('are you sure ??')) {
      this.api.deleteOrder(id).subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'Success Message',
            summary: 'Deleted Successfully',
            duration: 4000,
          });
          this.getOrderList();
        },
        error: () => {
          this.toast.error({
            detail: 'Error Message',
            summary: 'Error While Deleting ',
            duration: 4000,
          });
        },
      });
    }
  }
}
