const express = require("express");
const router = express.Router();
const clientControllers = require("../controllers/clienteControllers");

// Ruta para obtener todos los clientes
router.get("/clientes", clientControllers.getAllClientes);

// Crear un nuevo cliente
router.post("/clientes", clientControllers.createCliente);

// eliminar cliente
router.put("/clientes/drop/:id", clientControllers.dropCliente);

// eliminar cliente
router.put("/clientes/up/:id", clientControllers.upCliente);

// actualizar cliente
router.put("/clientes/", clientControllers.updateCliente);

// //buscar por nombre
router.get("/clientes/filterBy/nombre", clientControllers.filterByNombre);

//Ordenar por estado
router.get("/clientes/orderByEstado", clientControllers.orderByEstado);

module.exports = router;
