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
  
});

 //Obtener un cliente por id
 router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const results = await dbConnection.query('SELECT * FROM Clientes WHERE id = ?', {
      replacements: [id],
      type: dbConnection.QueryTypes.SELECT,
    });

    if (results.length > 0){
      res.json(results[0]);
    } else{
      res.status(404).json({
        error: 'Cliente no encontrado'
      });
    }
  } catch (error){
    console.error("Error al ejecutar la consulta SQL:", error);
    res.status(500).json({ error: "Error al obtener el cliente por ID" });
  }
});

 //Editar un cliente
 router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, correo_electronico, numero_de_telefono, direccion} = req.body;

  try {
    const results = await dbConnection.query('UPDATE Clientes SET nombre=?, correo_electronico=?, numero_de_telefono=?, direccion=? WHERE id=?', {
      replacements: [nombre, correo_electronico, numero_de_telefono, direccion, id],
      type: dbConnection.QueryTypes.UPDATE,
    });

    res.json(results);
  } catch (error){
    console.error("Error al ejecutar la consulta SQL:", error);
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }
});

//Eliminar un cliente
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const results = await dbConnection.query('DELETE FROM Clientes WHERE id = ?',{
      replacements: [id],
      type: dbConnection.QueryTypes.DELETE,
    });

    res.json(results);
  } catch (error){
    console.error("Error al ejecutar la consulta SQL:", error);
    res.status(500).json({ error: "Error al eliminar el cliente" });
  }
});

module.exports = router;