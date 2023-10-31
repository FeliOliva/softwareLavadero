const express = require("express");
const router = express.Router();
const vehControllers = require("../controllers/vehiculosControllers");

// Ruta para obtener todos los vehiculos
router.get("/vehiculos", vehControllers.getAllVehiculos);

// Crear un nuevo vehiculo
router.post("/vehiculos", vehControllers.createVehiculo);

// eliminar vehiculo
router.put("/vehiculos/drop/:id", vehControllers.dropVehiculo);

// activar vehiculo
router.put("/vehiculos/up/:id", vehControllers.upVehiculo);

// actualizar vehiculo
router.put("/vehiculos/", vehControllers.updateVehiculo);

//buscar por patente
router.get("/vehiculos/filterBy/patente", vehControllers.filterByPatente);

//Ordenar por estado
router.get("/vehiculos/orderByEstado", vehControllers.orderByEstado);

// //buscar por modelo
// router.get("/vehiculos/filterBy/modelo", vehControllers.filterByModelo);

// //buscar por tipo de vehiculo
// router.get("/vehiculos/filterBy/tipoVehiculo", vehControllers.filterByTipoVeh);

module.exports = router;
