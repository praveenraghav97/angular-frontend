import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[];
  employee: Employee;
  imageDirPath:string = "C:/Users/prave/Documents/sts-workspace/springboot-backend/src/main/webapp/imagedata/60f006542dd87250ab06fbf7Pic.jpeg";

  constructor(private employeeService: EmployeeService,
     private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      console.log(data);
      this.employees = data;
    });
  }
  updateEmployee(id: string) {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe(data=>{
      console.log(data);
      this.getEmployees();
    }, error => console.log(error)); 
  }

  disableEmployee(id: string) {    
    this.employeeService.getEmployeeById(id).subscribe( data => {
      this.employee = data;
    }
    );
    this.employeeService.updateStatus(id).subscribe(data=> {
      this.getEmployees();
    });
  }
}
