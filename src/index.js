const app = require('./app')

//corremos el puerto indicado
app.listen(app.get("port"), () => {
    console.log(`Servidor en puerto ${app.get("port")}`);
  });