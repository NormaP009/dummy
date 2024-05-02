const dbConnection = require('../database/connection');
const router = require('express').Router();

//Obtener todos los clientes
router.get("/", async (req, res) => {
  try{
    const results = await dbConnection.query('SELECT * FROM Clientes', {
      type: dbConnection.QueryTypes.SELECT,
    });

    res.json(results);
  }catch (error){
    console.error("Error al ejecutar la consulta SQL:", error);
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
});

module.exports = router;