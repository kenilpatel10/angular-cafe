import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import jsPDF from 'jspdf'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { LoaderService } from 'src/app/services/loader.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css'],
})
export class BillDetailsComponent implements OnInit {
  myDate : any= new Date();
  constructor(
  
    public loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: NgToastService,
    private api: ApiService
  ) { 
   }
  id: any;
  billDetail: any;
  billDetail1: any;
date: any;
  Gst: number= 0.10;
  ngOnInit(): void {
    console.log(this.myDate)
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getSingleBill(this.id).subscribe((res) => {
      this.billDetail = res.bill;
      console.log("bill",res.bill);
      this.billDetail1=res.bill.orderItems;
    });
    console.log(this.id);
  }
  onPrint(){
    // window.print();
  let data=  document.getElementById('billToGenerate')
   this.generatePdf(data);
}
generatePdf(htmlContent: any){
html2canvas(htmlContent).then(canvas=>{
  let imgWidth =290;
  let imgHeight=(canvas.height *imgWidth /canvas.width)
  const contentDataURL=canvas.toDataURL('image/png')
  let pdf = new jsPDF('l', 'mm', 'a4');
  var position = 10 ;
  pdf.addImage(contentDataURL,'PNG',5,position,imgWidth,imgHeight)
  pdf.save(this.billDetail.customerName +" " + this.myDate + "Bill" +'.pdf')

})
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
}
