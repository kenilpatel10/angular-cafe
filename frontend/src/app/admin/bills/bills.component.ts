import { Component, OnInit,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';;
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { BillDetailsComponent } from '../bill-details/bill-details.component';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'customerName',
    'phone',
    'createdAt',
    'totalPrice',
    'action'
    
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(   public loaderService: LoaderService, private api: ApiService,
    private toast: NgToastService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllBills();
   
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  logOut() {
    if (window.confirm('Are You Sure?? ')) {
      localStorage.removeItem('name');
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      localStorage.removeItem('role')
      this.router.navigate(['']);
      this.toast.success({
        detail: 'Success Message',
        summary: 'Logged Out Successfully',
        duration: 4000,
      });
    }
  }
 
  openDialog(id: any){
    this.dialog
    .open(BillDetailsComponent, {
      width: 'auto',
      data: id,
    })
    .afterClosed()
    .subscribe((val) => {
      if (val === 'update') this.getAllBills();
    });
  }
  viewBill(id: any){
  console.log(id)
    this.api.getSingleBill(id).subscribe({
      next: (res) => {
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
  deleteBill(id: any){
    if(window.confirm("Are You Sure ???")){
      this.api.deleteBill(id).subscribe({
        next: (res) => {
     
          this.toast.success({
            detail: 'Success Message',
            summary: 'Bill Deleted Successfully',
            duration: 4000,
          });
          this.getAllBills();
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
 
  }

 
  bills:any;
  
  getAllBills() {
    this.api.getBills().subscribe({
      next: (res) => {
        this.bills = res.bill;
        this.dataSource = new MatTableDataSource(res.bill.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("soert",this.sort)
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
}
