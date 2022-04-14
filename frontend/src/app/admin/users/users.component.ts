import { Component, OnInit, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'email',
    'name',
    'role',
    'status',
    'action',
  ];

  checked: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public loaderService: LoaderService,
    private toast: NgToastService,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
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
  deleteUser(id: any){
    this.api.deleteUsers(id).subscribe({
      next: (res) => {
        if(window.confirm("Are you Sure, you want to delete this??")){
          this.toast.success({detail: "Success Message", summary:"User Deleted Successfully", duration:4000});
          this.getAllUsers();
        }
  
      },
      error: () => {
        this.toast.error({detail: "Error Message", summary:"Error While Deleting Issue", duration:4000})
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Alldata: any = [];
  show: boolean = false;
  changed(data: any) {
    const fd = new FormData();
 
    if (data.status === true) {
      fd.append('status', 'false');
    }
    if (data.status === false) {
      fd.append('status', 'true');
    }

    this.api.updateUser(data._id, fd).subscribe((res) => {});
    this.getAllUsers();
  }
  getAllUsers() {
    this.api.getUsers().subscribe({
      next: (res) => {
        this.Alldata = res.user;
        this.dataSource = new MatTableDataSource(res.user);
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
}
