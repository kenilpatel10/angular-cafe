import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatCardXlImage } from '@angular/material/card';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( public loaderService: LoaderService,private api : ApiService ,private toast : NgToastService,private router: Router) { }
bills: any;
totalSales: any;
items:any;
users: any;
name: any;
userscount: any;
itemscount:any;



  ngOnInit(): void {
    this.api.getBills().subscribe((res)=>{
      this.bills= res.bill;
      this.totalSales= this.getTotalSales();
    })
    this.api.getProducts().subscribe((res)=>{
      this.items= res.products;
      this.itemscount=this.items.length;
    })
    this.api.getUsers().subscribe((res)=>{
      this.users= res.user;
      this.userscount= this.users.length;
    })



  }
 
  getTotalSales() {
    return  this.bills.map((t: any) => t.totalPrice + 0).reduce(
      (acc: any, value: any) => acc + value,
      0
    );
    
  }
  // this.Sales= setInterval(SalesCount, 10)
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
}
