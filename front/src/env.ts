export const MY_SERVER = 'http://127.0.0.1:5000/'

export class Student{
    name:string = "";
    email:string = "";
    grades:Record<string,number> = {english:0,math:0,computer:0};
    id:number = 0;

    constructor(name:string,email:string,english:number,math:number,computer:number,id:number)
    {
        this.name = name;
        this.email = email;
        this.grades.english = english;
        this.grades.math = math;
        this.grades.computer = computer;
        this.id = id;
    }
}