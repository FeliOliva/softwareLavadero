const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

// Ruta para obtener todos los usuarios
router.get("/users", userController.getAllUsers);

module.exports = router;
