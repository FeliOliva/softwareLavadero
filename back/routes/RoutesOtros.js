const express = require("express");
const router = express.Router();

const localidadControllers = require("../controllers/localidadControllers");
const marcaControllers = require("../controllers/marcaControllers");
const modelControllers = require("../controllers/modelosControllers");

// Ruta para obtener todas las localidades
router.get("/localidades", localidadControllers.getAllLocalidades);

// Ruta para obtener todas las marcas
router.get("/marcas", marcaControllers.getAllMarcas);

// Ruta para obtener todos los modelos
router.get("/modelos", modelControllers.getAllModelos);

module.exports = router;
