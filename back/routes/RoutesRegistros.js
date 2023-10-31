const express = require("express");
const router = express.Router();
const registroControllers = require("../controllers/registroControllers");

// Ruta para obtener todos los registros
router.get("/registros", registroControllers.getAllRegistros);

// Crear un nuevo registro
router.post("/registros", registroControllers.createRegistro);

// eliminar registro
router.put("/registros/drop/:id", registroControllers.dropRegistro);

// eliminar registro
router.put("/registros/up/:id", registroControllers.upRegistro);

// actualizar registro
router.put("/registros/", registroControllers.updateRegistro);

// //buscar por id
router.get("/registros/filterBy/:id", registroControllers.filterByID);

//Ordenar por estado
router.get("/registros/orderByEstado", registroControllers.orderByEstado);

module.exports = router;
