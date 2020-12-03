class Person{
    name:string;
    job:string;
    salary:number;

    constructor(name:string, job:string, salary:number){
        this.name = name;
        this.job = job;
        this.salary = salary;
    }

    get_Info(){
        console.log(`Name : ${this.name} \nJob : ${this.job} \nSalary : ${this.salary}`);
    }
}

const wahyu = new Person('Wahyu Setianto', 'Mahasiswa', 0);
console.log(wahyu.get_Info());