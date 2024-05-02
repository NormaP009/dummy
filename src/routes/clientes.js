const Cliente = require('../models/cliente');
const router = require('express').Router();

//Obtener todos los clientes
router.get("/", async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
});

module.exports = router;