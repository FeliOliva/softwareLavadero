const vehModel = require("../models/vehiculosModels");

const getAllVehiculos = async (req, res) => {
  try {
    const vehiculos = await vehModel.getAllVehiculos();
    res.json(vehiculos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener vehículos." });
  }
};

const createVehiculo = async (req, res) => {
  try {
    const { patente, idTipoVehiculo, idModelo, idCliente } = req.body;
    await vehModel.createVehiculo(patente, idTipoVehiculo, idModelo, idCliente);
    res.status(201).json({ message: "Vehiculo agregado correctamente." });
  } catch (err) {
    res.status(500).json({ error: "Error al agregar el vehiculo." });
  }
};

const dropVehiculo = async (req, res) => {
  try {
    const vehiculoId = req.params.id;
    await vehModel.dropVehiculo(vehiculoId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el vehículo." });
  }
};

const upVehiculo = async (req, res) => {
  try {
    const vehiculoId = req.params.id;
    await vehModel.upVehiculo(vehiculoId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error al activar el vehículo." });
  }
};

const updateVehiculo = async (req, res) => {
  try {
    const { patente, idTipoVehiculo, idModelo, idCliente, id } = req.body;
    await vehModel.updateVehiculo(
      patente,
      idTipoVehiculo,
      idModelo,
      idCliente,
      id
    );
    res.status(200).json({ message: "Vehiculo actualizado exitosamente." });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el vehiculo." });
  }
};

const filterByPatente = async (req, res) => {
  try {
    const { patente } = req.query;
    const vehiculosFiltrados = await vehModel.filterByPatente(patente);
    res.json(vehiculosFiltrados);
  } catch (err) {
    res.status(500).json({ error: "Error al filtrar vehículos." });
  }
};

const orderByEstado = async (req, res) => {
  try {
    const vehiculosxEstado = await vehModel.orderByEstado();
    res.json(vehiculosxEstado);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener vehículos." });
  }
};
// const filterByModelo = async (req, res) => {
//   try {
//     const { idModelo } = req.query;
//     const vehiculosFiltrados = await vehModel.filterByModelo(idModelo);
//     res.json(vehiculosFiltrados);
//   } catch (err) {
//     res.status(500).json({ error: "Error al filtrar vehículos." });
//   }
// };

// const filterByTipoVeh = async (req, res) => {
//   try {
//     const { idTipoVehiculo } = req.query;
//     const vehiculosFiltrados = await vehModel.filterByTipoVeh(tipoVehiculo);
//     res.json(vehiculosFiltrados);
//   } catch (err) {
//     res.status(500).json({ error: "Error al filtrar vehículos." });
//   }
// };

module.exports = {
  getAllVehiculos,
  createVehiculo,
  dropVehiculo,
  updateVehiculo,
  upVehiculo,
  filterByPatente,
  orderByEstado,
};
