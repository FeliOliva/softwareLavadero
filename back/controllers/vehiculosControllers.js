const vehModel = require('../models/vehiculosModels');

const getAllVehiculos = async (req, res) => {
  try {
    const vehiculos = await vehModel.getAllVehiculos();
    res.json(vehiculos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener vehículos.' });
  }
};


const createVehiculo = async (req, res) => {
  try {
    const { patente, idTipoVehiculo, idModelo, idCliente } = req.body;
    await vehModel.createVehiculo(patente, idTipoVehiculo, idModelo, idCliente);
    res.status(201).json({ message: 'Vehiculo agregado correctamente.' });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar el vehiculo.' });
  }
};

const dropVehiculo = async (req, res) => {
  try {
    const vehiculoId = req.params.id;
    await vehModel.dropVehiculo(vehiculoId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el vehículo.' });
  }
};

const updateVehiculo = async (req, res) => {
  try {
    const { patente, idTipoVehiculo, idModelo, idCliente, id } = req.body;
    await vehModel.updateVehiculo(patente, idTipoVehiculo, idModelo, idCliente, id);
    res.status(200).json({ message: 'Vehiculo actualizado exitosamente.' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el vehiculo.' });
  }
};



module.exports = {
  getAllVehiculos,
  createVehiculo,
  dropVehiculo,
  updateVehiculo
}