console.log(arguments);
console.log(require('module').wrapper);

//Module.exports
const C=require('./test-module-1');
const Calc=new C();
console.log(Calc.add(2,5));


//exports
// const calc2=require('./test-module-2');
// console.log(calc2);
const {add,multiply}=require('./test-module-2');
console.log(add(4,5));
console.log(multiply(4,5));


//caching
require('./test- module-3')();
require('./test- module-3')();
require('./test- module-3')();

