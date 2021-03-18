<<<<<<< HEAD
const express = require("express");
const app = express();

let logged = function (req, res, next) {
  let currentdate = new Date();
  let formatteddate =
    currentdate.getDate() +
    "-" +
    currentdate.getMonth() +
    "-" +
    currentdate.getFullYear();
  console.log(formatteddate);
  next();
};

let errorfunction = function (err, req, res, next) {
  console.log("error");
  next();
};

app.use(logged);
app.use(errorfunction);

app.get("/error", (req, res) => {
  res.send("Error present on the status");
});

app
  .get("/request", (req, res) => {
    res.send("Request Logged");
  })
  .listen(60000);
=======
const express = require('express')
const app = express();


let logged = function(req , res , next){
 let currentdate = new Date();
 let formatteddate = currentdate.getDate() +"-" + currentdate.getMonth() +"-" + currentdate.getFullYear(); 
 console.log(formatteddate)
 next();
}

let errorfunction = function(err ,req ,res ,next){
    console.log("error")
    next();
};


app.use(logged)
app.use(errorfunction)





app.get('/error' , (req ,res) =>{
    res.send("Error present on the status")
})

app.get('/request' ,(req , res) =>{
    res.send("Request Logged")
}).listen(60000);





>>>>>>> 945215c2048e27062ca4b98b0a97b3936ba42331
