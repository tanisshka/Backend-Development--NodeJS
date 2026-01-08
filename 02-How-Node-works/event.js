const EventEmitter = require("events");
const myEmitter = new EventEmitter();

// LISTENERS
myEmitter.on("newSale", () => {
  console.log("There was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Tanishka");
});

// EMITTER
setTimeout(() => {
  myEmitter.emit("newSale");
  console.log("Timer ended");
}, 3000);

console.log("Welcome");

const myEmitter1=new EventEmitter();
myEmitter1.on("newSale1",stock=>{
    console.log(`There are ${stock} items left`);
});

myEmitter1.emit("newSale1",9);