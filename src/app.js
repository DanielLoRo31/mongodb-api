//Instalar express, express y app expres son requeridos para utilizar express
const express = require("express");
const app = express();

//Estas 3 dependecias son para que sirvan bien las peticiones
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan"); // devuelve datos de la peticion bonitos

// dependencia de mongo
const mongoose = require("mongoose");

// traer mi ruta de usuarios
const userRoute = require("../routes/usersRoutes.js");
const queryRoute = require("../routes/queryRoutes");

//Asignamos el puerto
// eslint-disable-next-line no-undef
app.set("port", process.env.PORT || 3000);

// Parsear solicitud del cliente

//Midleware - Procesar datos antes de llegar a las rutas
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const isLogged = (req, res, next) => {
  //console.log("Middleware isLogged");
  next();
};

//filtros de autorización
app.use(isLogged);
//poner bonitos las pediticiones
app.use(morgan("dev"));

// -- Midleware - Procesar datos antes de llegar a las rutas

//conexión a mongoDB
mongoose
  .connect("mongodb://localhost:27017/drivinglessons")
  //.connect("mongodb+srv://<user>:<Password>@myfirstcluster.jfcnj.mongodb.net/SalleApp?retryWrites=true&w=majority")
  .then((db) => {
    console.log("Conectado a mongodb ");
  })
  .catch((error) => {
    console.log("No se pudo conectar a mongodb: ", error);
  });

// asignamos el path
app.use("/users", userRoute);
app.use("/testMongo", queryRoute);

// exportamos el app
module.exports = app;
