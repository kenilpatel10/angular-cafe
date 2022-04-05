import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  constructor(private api: ApiService,private formBuilder: FormBuilder,private toast : NgToastService,private router: Router) { }

tables:any;
  ngOnInit(): void {
   
    this.api.getTables().subscribe((res)=>{
      this.tables= res.tables;
      console.log( this.tables)
    })
  

  }


onTableClick(id: any){
//  let i =0 ;
//  i += 1
  this.api.getSingleTable(id).subscribe({
    next:(res)=>{
  // const order1= JSON.stringify(localStorage.getItem("order"));
      // localStorage.setItem(`orders${i}`,order1)
      localStorage.setItem("tableId",res.table._id)
      localStorage.setItem("tableName",res.table.name)
      this.router.navigate(['table'])
    }
  })
// console.log(id)
}
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


}
