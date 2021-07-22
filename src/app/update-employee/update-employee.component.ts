import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: string;
  employee: Employee = new Employee();
  selectedItemsList = [] as any;

  skillSet = [
    {
      "name":"Java",
      isChecked: false
    },
    {
      "name":"CPP",
      isChecked: false
    },
    {
      "name":"MySQL",
      isChecked: false
    },
    {
      "name":"MongoDB",
      isChecked: false
    },
    {
      "name":"Spring",
      isChecked: false
    }
  ]

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.fetchSelectedItems() 
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data=>{
      this.employee = data;
      for(var skill of this.employee.skills){
        for(var mySkill of this.skillSet){
          if(skill.name === mySkill.name){
            mySkill.isChecked = true;
          }
        }        
      }
    }, error => console.log(error));
       
  }
  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.skillSet.filter((value, index) => {
      return value.isChecked
    });
    this.employee.skills = this.selectedItemsList;
    console.log(this.employee.skills)
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  onSubmit() {
    console.log(this.employee)
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(data => {
      console.log(data),
      this.goToEmployeeList();
    }, error => console.log(error));
  }
}
