import { Component, OnInit, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatDialog } from '@angular/material/dialog';
import { UpdateItemComponent } from '../update-item/update-item.component';
@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css'],
})
export class AllItemsComponent implements OnInit {
  categories: any = [];
  products: any;
  displayedColumns: string[] = [
    'name',
    'category',
    'price',
    'status',
    'action',
  ];
  displayedCategory: string[] = ['id', 'name', 'action'];
  displayedTables: string[] = ['id', 'name', 'action'];
  dataSource!: MatTableDataSource<any>;
  dataCategory!: MatTableDataSource<any>;
  dataTable!: MatTableDataSource<any>;
  checked: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private toast: NgToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
    this.getAllTables();
  }
  AllItems: any;
  AllCategories: any;
  openDialog() {
    this.dialog.open(UpdateItemComponent);
  }

  //get all items
  getAllProducts() {
    this.api.getProducts().subscribe({
      next: (res) => {
        this.AllItems = res.products;
 
        this.dataSource = new MatTableDataSource(res.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        this.toast.error({
          detail: 'Error Message',
          summary: 'Error While Fetching Data',
          duration: 4000,
        });
      },
    });
  }
  //delete items
  deleteProduct(id: any) {
    if (window.confirm('Are you Sure, you want to delete this??')) {
    this.api.deleteProduct(id).subscribe({
      next: (res) => {
       
          this.toast.success({
            detail: 'Success Message',
            summary: 'Item Deleted Successfully',
            duration: 4000,
          });
          this.getAllProducts();
      
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
  deleteCategory(id: any) {
    if (window.confirm('Are you Sure, you want to delete this??')) {
    this.api.deleteCategory(id).subscribe({
      next: (res) => {
       
          this.toast.success({
            detail: 'Success Message',
            summary: 'Category Deleted Successfully',
            duration: 4000,
          });
          this.getAllCategories();
  
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
  deleteTable(id: any) {
    if (window.confirm('Are you Sure, you want to delete this??')) {
    this.api.deleteTable(id).subscribe({
      next: (res) => {
        
          this.toast.success({
            detail: 'Success Message',
            summary: 'Table Deleted Successfully',
            duration: 4000,
          });
          this.getAllTables();
  
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
  //edit on dialog
  onedit(row: any) {
    this.dialog
      .open(UpdateItemComponent, {
        width: 'auto',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') this.getAllProducts();
      });
  }
  //update value for switch
  updateProduct(data: any) {
    const fd = new FormData();

    this.api.updateProduct(data._id, fd).subscribe((res) => {});
    this.getAllProducts();
  }
  // on chnaged for switch
  changed(data: any) {
    const fd = new FormData();
    if (data.status === true) {
      fd.append('status', 'false');
    }
    if (data.status === false) {
      fd.append('status', 'true');
    }

    this.api.updateProduct(data._id, fd).subscribe((res) => {});
    this.getAllProducts();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  AllTables: any;
  //get all tables
  getAllTables() {
    this.api.getTables().subscribe({
      next: (res) => {
        this.AllTables = res.tables;

        this.dataTable = new MatTableDataSource(res.tables);
        this.dataTable.sort = this.sort;
      },
      error: () => {
        this.toast.error({
          detail: 'Error Message',
          summary: 'Error While Fetching Data',
          duration: 4000,
        });
      },
    });
  }
  //get all categories
  getAllCategories() {
    this.api.getCategories().subscribe({
      next: (res) => {
        this.AllCategories = res.category;

        this.dataCategory = new MatTableDataSource(res.category);
        this.dataCategory.sort = this.sort;
      },
      error: () => {
        this.toast.error({
          detail: 'Error Message',
          summary: 'Error While Fetching Data',
          duration: 4000,
        });
      },
    });
  }
  //Log out
  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
    this.toast.success({
      detail: 'Success Message',
      summary: 'Logged Out Successfully',
      duration: 4000,
    });
  }
}
