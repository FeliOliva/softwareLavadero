const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const vehControllers = require('../controllers/vehiculosControllers');
const servControllers = require('../controllers/serviciosControllers');
const clientControllers = require('../controllers/clienteControllers');
const localidadControllers = require('../controllers/localidadControllers');
const marcaControllers = require('../controllers/marcaControllers');
const modelControllers = require('../controllers/modelosControllers');



// Ruta para obtener todos los usuarios
router.get('/users', userController.getAllUsers);

// Ruta para obtener todas las localidades
router.get('/localidades', localidadControllers.getAllLocalidades);

// Ruta para obtener todas las marcas
router.get('/marcas', marcaControllers.getAllMarcas);

// Ruta para obtener todos los modelos
router.get('/modelos', modelControllers.getAllModelos);

//----------------------------------------------------------------------------------------------------------------------------

// Ruta para obtener todos los vehiculos
router.get('/vehiculos', vehControllers.getAllVehiculos);

// Crear un nuevo vehiculo
router.post('/vehiculos', vehControllers.createVehiculo);

// eliminar vehiculo
router.put('/vehiculos/:id', vehControllers.dropVehiculo);

// actualizar vehiculo
router.put('/vehiculos/', vehControllers.updateVehiculo);

//----------------------------------------------------------------------------------------------------------------------------

// Ruta para obtener todos los clientes
router.get('/clientes', clientControllers.getAllClientes);

// Crear un nuevo cliente
router.post('/clientes', clientControllers.createCliente);

// eliminar cliente
router.put('/clientes/:id', clientControllers.dropCliente);

// actualizar cliente
router.put('/clientes/', clientControllers.updateCliente);
//---------------------------------------------------------------------------------------------------------------------------
// Ruta para obtener todos los servicios
router.get('/servicios', servControllers.getAllServicios);

// Crear un nuevo Servicios
router.post('/servicios', servControllers.createServicio);

// eliminar Servicios
router.put('/servicios/:id', servControllers.dropServicio);

// actualizar Servicios
router.put('/servicios/', servControllers.updateServicio);

module.exports = router;
