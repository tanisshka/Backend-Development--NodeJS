//! FILE SYSTEM
const fs = require("fs");

//Blocking, synchronous way
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `This is what we know about Avacado:${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written");

//Non-blocking, asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  if (err) return console.log("ERROR!");
  console.log(data);
});
console.log("Reading file....");

//! SERVER
//Import the http module
const http = require("http");
const url= require("url");

// Read JSON data ONCE
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// Template replacement function
const replaceTemplates=require('./modules/replaceTemplate');

// Read templates (IMPORTANT: utf-8)
const tempOveriew = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

//Create a http server with req and res
const server = http.createServer((req, res) => {

  console.log(req.url);
  //True tells the nodeJS: “parse query string into an object”
  console.log(url.parse(req.url,true));
   const {query,pathname}=url.parse(req.url,true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    // Generate cards HTML
    const cardsHtml = dataObj
      .map(el => replaceTemplates(tempCard, el))
      .join("");

    // Inject cards into overview template
    const output = tempOveriew.replace(
      "{%PRODUCT_CARDS%}",
      cardsHtml
    );

    res.end(output);

  } else if (pathname === "/product") {
    res.writeHead(200,{
      'content-type':'text/html'
    });
    const product=dataObj[query.id];
    const output=replaceTemplates(tempProduct,product);
    res.end(output);

  } else if (pathname === "/API") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found</h1>");
  }
});

//Define the post to list to
//Start the server and listen on the port
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
