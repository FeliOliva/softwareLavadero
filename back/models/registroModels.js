const db = require("../database");
const queriesRegistros = require("../querys/querysRegistros");

const getAllRegistros = async () => {
  try {
    const [rows] = await db.query(queriesRegistros.getAllRegistros);
    return rows;
  } catch (err) {
    throw err;
  }
};

const createRegistro = async (
  hora,
  fecha,
  idCliente,
  idVehiculo,
  idServicio
) => {
  try {
    const query = queriesRegistros.createRegistro;
    await db.query(query, [hora, fecha, idCliente, idVehiculo, idServicio]);
  } catch (err) {
    throw err;
  }
};

const dropRegistro = async (id) => {
  try {
    const query = queriesRegistros.dropRegistro;
    await db.query(query, [id]);
  } catch (err) {
    throw err;
  }
};

const upRegistro = async (id) => {
  try {
    const query = queriesRegistros.upRegistro;
    await db.query(query, [id]);
  } catch (err) {
    throw err;
  }
};

const updateRegistro = async (
  hora,
  fecha,
  idCliente,
  idVehiculo,
  idServicio,
  id
) => {
  try {
    const query = queriesRegistros.updateRegistro;
    await db.query(query, [hora, fecha, idCliente, idVehiculo, idServicio, id]);
  } catch (err) {
    throw err;
  }
};
const filterByID = async (registroId) => {
  try {
    const query = queriesRegistros.filterByID;
    const [rows] = await db.query(query, [registroId]);
    return rows[0];
  } catch (err) {
    throw err;
  }
};

const orderByEstado = async () => {
  try {
    const [rows] = await db.query(queriesRegistros.orderByEstado);
    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllRegistros,
  createRegistro,
  upRegistro,
  dropRegistro,
  updateRegistro,
  filterByID,
  orderByEstado,
};
