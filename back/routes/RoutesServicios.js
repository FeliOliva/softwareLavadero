const express = require("express");
const router = express.Router();
const servControllers = require("../controllers/serviciosControllers");

// Ruta para obtener todos los servicios
router.get("/servicios", servControllers.getAllServicios);

// Crear un nuevo Servicios
router.post("/servicios", servControllers.createServicio);

// eliminar Servicios
router.put("/servicios/drop/:id", servControllers.dropServicio);

// eliminar Servicios
router.put("/servicios/up/:id", servControllers.upServicio);

// actualizar Servicios
router.put("/servicios/", servControllers.updateServicio);

// //buscar por nombre
router.get("/servicios/filterBy/nombre", servControllers.filterByNombre);

//Ordenar por estado
router.get("/servicios/orderByEstado", servControllers.orderByEstado);

module.exports = router;
