import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { MyResponse } from '../response';
import { Skills } from '../skills';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  selectedItemsList = [] as any;
  imgURL : any;
  formData: FormData = new FormData();
  response: MyResponse;
  message: string;
  files:any;
  
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


  constructor(private employeeService : EmployeeService, 
    private router: Router
    ) { }

    ngOnInit(): void {
      this.fetchSelectedItems()
    }
  
    changeSelection() {
      this.fetchSelectedItems()
    }
  
    fetchSelectedItems() {
      this.selectedItemsList = this.skillSet.filter((value, index) => {
        return value.isChecked
      });
      //console.log(this.selectedItemsList)
    }
    

  saveEmployee() {
    this.employee.skills = this.selectedItemsList;
    //console.log(this.employee);
    this.employeeService.createEmployee(this.employee).subscribe(data=> {
      this.response = data;
      if(this.response.response == "false1" ){
        this.message = "Email Id already present, Please choose another";
      } else if(this.response.response == "false2" ){
        this.message = "Mobile number already present, Please choose another";

      } else{
          //console.log(data.id)
          this.formData.append("id", data.id);
          this.employeeService.uploadImage(this.formData).subscribe(data=>{
            console.log(data);
          })
          this.goToEmployeeList();
      }      
    })
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  onSubmit(){    
    this.saveEmployee();    
  }  

  onFocusOutEvent(event : any) {
    //this.employeeService.checkEmail(event.target.value);
  }

  imageUpload(event:any){    
    this.files = event.target.files[0];
    
    this.formData.append("image", this.files, this.files.name);
    console.log(this.formData);
  }  
  
}
