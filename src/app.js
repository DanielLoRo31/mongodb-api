const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const morgan = require("morgan");

const userRoute = require("../routes/usersRoutes.js");


// Parsear solicitud del cliente
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//filtros de autorización
const isLogged = (req, res, next) => {
  console.log("Middleware isLogged");
  next();
};

//app.use(isLogged);
//poner bonitos las pediticiones
app.use(morgan("dev"));

mongoose
  .connect("mongodb://localhost:27017/SalleApp")
  //.connect("mongodb+srv://nintendo:QaMzcGTlIBI4poL9@myfirstcluster.jfcnj.mongodb.net/SalleApp?retryWrites=true&w=majority")
  .then((db) => {
    console.log("Conectado a mongodb ");
  })
  .catch((error) => {
    console.log("No se pudo conectar a mongodb: ", error);
  });

app.use("/users", userRoute);


module.exports = app
