// function Course(name, price) { //contructor function
//   this.name = name;
//   this.price = price;
//   this.getName = function () {
//     return this.name;
//   }
//   const isSuccess = false;
// }

class Course {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }
}

const phpCourse = new Course("PHP", 1000);
const jsCourse = new Course("JS", 1500);

console.log(phpCourse);
console.log(jsCourse);
