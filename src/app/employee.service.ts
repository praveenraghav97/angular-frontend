import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { MyResponse } from './response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = "http://localhost:8080/api/v1/employees";

  constructor(private httpClient: HttpClient) { } 
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch employees list
  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl)
  }

  createEmployee(employee: Employee) : Observable<MyResponse> {
    return this.httpClient.post<MyResponse>(`${ this.baseUrl}`, employee);
  }

  getEmployeeById(id: string) : Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`)
  }

  updateEmployee(id: string, employee: Employee): Observable<MyResponse> {
    return this.httpClient.put<MyResponse>(`${this.baseUrl}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<MyResponse> {
    return this.httpClient.delete<MyResponse>(`${this.baseUrl}/${id}`);
  }

  updateStatus(id: string): Observable<MyResponse> {
    return this.httpClient.get<MyResponse>(`${this.baseUrl}/status/${id}`);
  }
  
  uploadImage(formData: FormData): Observable<MyResponse> {
    return this.httpClient.post<MyResponse>(`${this.baseUrl}/image-upload`, formData);
  }
}


