import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
config: any =sessionStorage.getItem('token')
api:any="http://localhost:4000/"
  constructor(private http: HttpClient) {

   }
   isLoggedIn(){
     return !!localStorage.getItem('token')
   }
   postBill(data: any){
    return this.http.post<any>('http://localhost:4000/api/c1/createBill', data).pipe(catchError(this.errorHandler));
  }
  getBills(){
    return this.http.get<any>('http://localhost:4000/api/c1/admin/bill');
  }
  updateBill(id: any, data: any){
    return this.http.put<any>(`http://localhost:4000/api/c1/admin/bill/${id}`, data);
  }
  deleteBill(id:any){
    return this.http.delete<any>(`http://localhost:4000/api/c1/admin/bill/${id}`);
  }
  getSingleBill(id:any){
    return this.http.get<any>(`http://localhost:4000/api/c1/admin/bill/${id}`);
  }
  postUser(data: any){
    return this.http.post<any>('http://localhost:4000/api/c1/register', data).pipe(catchError(this.errorHandler));
  }
  postLogin(data: any){
    return this.http.post<any>('http://localhost:4000/api/c1/login', data).pipe(catchError(this.errorHandler));
  }
  postCategory(data: any){
    return this.http.post<any>('http://localhost:4000/api/c1/category', data).pipe(catchError(this.errorHandler));
  }
  postItems(data: any){
    return this.http.post<any>('http://localhost:4000/api/c1/admin/product/new', data).pipe(catchError(this.errorHandler));
  }
  getProducts(){
    return this.http.get<any>('http://localhost:4000/api/c1/products');
  }
  getSingleProduct(id: any){
    return this.http.get<any>(`http://localhost:4000/api/c1/product/${id}`);
  }
  deleteProduct(id:any){
    return this.http.delete<any>(`http://localhost:4000/api/c1/admin/product/${id}`);
  }
  updateProduct(id: any, data: any){
    return this.http.put<any>(`http://localhost:4000/api/c1/admin/product/${id}`, data);
  }
  postTable(data: any){
    return this.http.post<any>('http://localhost:4000/api/c1/admin/createTable', data).pipe(catchError(this.errorHandler));
  }
  getTables(){
   
      return this.http.get<any>('http://localhost:4000/api/c1/tables');
  
  
  }
  deleteTable(id:any){
    return this.http.delete<any>(`http://localhost:4000/api/c1/table/${id}`);
  }
  getCategories(){
    return this.http.get<any>('http://localhost:4000/api/c1/categories');
  }
  deleteCategory(id:any){
    return this.http.delete<any>(`http://localhost:4000/api/c1/category/${id}`);
  }
  getUsers(){

    return this.http.get<any>('http://localhost:4000/api/c1/admin/users');
  }
  updateUser(id: any , data: any){
    return this.http.put<any>(`http://localhost:4000/api/c1/admin/user/${id}`, data);
  }
  getSingleTable(id: any){
    return this.http.get<any>(`http://localhost:4000/api/c1/table/${id}`);
  }
  deleteUsers(id:any){
    return this.http.delete<any>(`http://localhost:4000/api/c1/admin/user/${id}`);
  }
  postOrder(data: any){
    return this.http.post<any>('http://localhost:4000/api/c1/createorder', data).pipe(catchError(this.errorHandler));
  }
  getOrders(){
    return this.http.get<any>('http://localhost:4000/api/c1/admin/orders');
  }
  updateOrder(id: any, data: any){
    return this.http.put<any>(`http://localhost:4000/api/c1/admin/order/${id}`, data);
  }
  deleteOrder(id:any){
    return this.http.delete<any>(`http://localhost:4000/api/c1/admin/order/${id}`);
  }
  deleteAllOrders(id:any){
    return this.http.delete<any>(`http://localhost:4000/api/c1/admin/orders/${id}`);
  }
  errorHandler(error: HttpErrorResponse): Observable<any>{
    return throwError(error.error.message || "SERVER ERROR")
  }
}
