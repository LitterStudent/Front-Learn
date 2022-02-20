class Person{
    ////////////////////////////////
    name:string
    age:number

    constructor(name:string,age:number){
        this.name = name;
        this.age = age;   
    }
    eating(){
        console.log("person eating.....");
    }
}

class Student extends Person{
    total: number
    constructor(name:string,age:number,total:number){
        super(name,age);
        this.total = total
    }
    eating(){
        super.eating();
        console.log("student eating....");
    }

}