const db = require('../database');
const queries = require('../querys/queriesVehiculo');

//vehiculos
const getAllVehiculos = async () => {
  try {
    const [rows] = await db.query(queries.getAllVehiculos);
    return rows;
  } catch (err) {
    throw err;
  }
};

//Crear un nuevo usuario en la base de datos (INSERT)
const createVehiculo = async (patente, idTipoVehiculo, idModelo, idCliente) => {
  try {
    const query = queries.createVehiculo;
    await db.query(query, [patente, idTipoVehiculo, idModelo, idCliente]);
  } catch (err) {
    throw err;
  }
};

//delete vehiculos
const dropVehiculo = async (id) => {
  try {
    const query = queries.dropVehiculo;
    await db.query(query, [id]);
  } catch (err) {
    throw err;
  }

};

const updateVehiculo = async (patente, idTipoVehiculo,idModelo,idCliente, id) => {
  try {
    const query = queries.updateVehiculo;
    await db.query(query, [patente, idTipoVehiculo, idModelo, idCliente, id]);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllVehiculos,
  createVehiculo,
  dropVehiculo,
  updateVehiculo,
}