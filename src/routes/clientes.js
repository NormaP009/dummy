const dbConnection = require('../database/connection');
const router = require('express').Router();

//Obtener todos los clientes
router.get("/", async (req, res) => {
  try {
    const results = await dbConnection.query('SELECT * FROM Clientes', {
      type: dbConnection.QueryTypes.SELECT,
    });

    res.json(results);
  } catch (error){
    console.error("Error al ejecutar la consulta SQL:", error);
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
});

//Crear un cliente
router.post('/', async (req, res) => {
  const { nombre, correo_electronico, numero_de_telefono, direccion} = req.body;
  try {
    
    if (!nombre || !correo_electronico || !numero_de_telefono || !direccion){
      return res.status(400).json({
        error: 'uno o mas campos vacios',
      });
    }

    const results = await dbConnection.query('INSERT INTO Clientes (nombre, correo_electronico, numero_de_telefono, direccion, creado_en) VALUES (?, ?, ?, ?, NOW())',
    {
      replacements: [nombre, correo_electronico, numero_de_telefono, direccion],
      type: dbConnection.QueryTypes.INSERT,
    });

    res.json(results);
  } catch (error){
    console.error("Error al ejecutar la consulta SQL:", error);
    res.status(500).json({ error: "Error al crear un nuevo cliente" });
  }
  


})

module.exports = router;