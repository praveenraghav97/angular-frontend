import { Skills } from "./skills";

export class Employee {
    id: string;
    firstName: string;
    lastName: string;
    emailId: string;
    mobile: string;
    gender: string;
    state: string;
    skills: Skills[]; 
    image:string;
}
