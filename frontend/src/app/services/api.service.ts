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
  getCategories(){
    return this.http.get<any>('http://localhost:4000/api/c1/categories');
  }
  getProducts(){
    return this.http.get<any>('http://localhost:4000/api/c1/products');
  }
  getTables(){
    return this.http.get<any>('http://localhost:4000/api/c1/tables');
  }
  getSingleTable(id: any){
    return this.http.get<any>(`http://localhost:4000/api/c1/table/${id}`);
  }
  deleteUsers(id:any){
    return this.http.delete<any>(`https://angular-issue.herokuapp.com/users/${id}`);
  }
  errorHandler(error: HttpErrorResponse): Observable<any>{
    return throwError(error.error.message || "SERVER ERROR")
  }
}
