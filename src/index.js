const cors = require('cors');
const clientes = require('./routes/clientes');
const dbConnection = require('./database/connection');
const express = require('express');
const app = express();
const port = process.env.PORT || 3030;


(async () => {
  try{
    await dbConnection.authenticate();
    console.log('conectado a la base de datos');
  }catch(error){
    throw new Error(error);
  }
})();

//al recibir los datos se convierte en objetos de javascript
app.use(express.json());

//habilita otras aplicaciones para realizar solicitudes a la app
app.use(cors()); 

app.use('/clientes', clientes);

app.listen(port, () => {
  console.log('servidor ejecutandose en el puerto:', port);

})