import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

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
  postTable(data: any){
    return this.http.post<any>('http://localhost:4000/api/c1/admin/createTable', data).pipe(catchError(this.errorHandler));
  }
  getCategories(){
    return this.http.get<any>('http://localhost:4000/api/c1/categories');
  }
  getProducts(){
    return this.http.get<any>('http://localhost:4000/api/c1/products');
  }
  getTables(){
    return this.http.get<any>('http://localhost:4000/api/c1/tables');
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
  errorHandler(error: HttpErrorResponse): Observable<any>{
    return throwError(error.error.message || "SERVER ERROR")
  }
}
