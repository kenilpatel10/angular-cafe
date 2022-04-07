import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
// deleteOrder( id: any){
//   this.localItems =localStorage.getItem('order')
//   let data=  JSON.parse(this.localItems)
//   console.log("items",data[indexOf()])
//   console.log("id",id)
//   const index = data.indexOf()

//   data.splice(index, 1)
//   console.log("i",index)
//   if(id === this.localItems.id){
//     console.log("remove")
//   }
// }