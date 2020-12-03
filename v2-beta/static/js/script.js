var Person = /** @class */ (function () {
    function Person(name, job, salary) {
        this.name = name;
        this.job = job;
        this.salary = salary;
    }
    Person.prototype.get_Info = function () {
        console.log("Name : " + this.name + " \nJob : " + this.job + " \nSalary : " + this.salary);
    };
    return Person;
}());
var wahyu = new Person('Wahyu Setianto', 'Mahasiswa', 0);
console.log(wahyu.get_Info());
