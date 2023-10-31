const db = require("../database");
const queriesVehiculo = require("../querys/queriesVehiculo");
const queries = require("../querys/queriesVehiculo");

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

const upVehiculo = async (id) => {
  try {
    const query = queries.upVehiculo;
    await db.query(query, [id]);
  } catch (err) {
    throw err;
  }
};
const updateVehiculo = async (
  patente,
  idTipoVehiculo,
  idModelo,
  idCliente,
  id
) => {
  try {
    const query = queries.updateVehiculo;
    await db.query(query, [patente, idTipoVehiculo, idModelo, idCliente, id]);
  } catch (err) {
    throw err;
  }
};

const filterByPatente = async (filtro) => {
  try {
    const query = queriesVehiculo.filterByPatente;
    const [rows] = await db.query(query, [`%${filtro}%`]);
    return rows;
  } catch (err) {
    throw err;
  }
};
const orderByEstado = async () => {
  try {
    const [rows] = await db.query(queries.orderByEstado);
    return rows;
  } catch (err) {
    throw err;
  }
};


// const filterByModelo = async (filtro) => {
//   try {
//     const query = queriesVehiculo.filterByModelo;
//     const [rows] = await db.query(query, [`%${filtro}%`]);
//     return rows;
//   } catch (err) {
//     throw err;
//   }
// };
// const filterByTipoVeh = async (filtro) => {
//   try {
//     const query = queriesVehiculo.filterByTipoVeh;
//     const [rows] = await db.query(query, [`%${filtro}%`]);
//     return rows;
//   } catch (err) {
//     throw err;
//   }
// };


module.exports = {
  getAllVehiculos,
  createVehiculo,
  dropVehiculo,
  updateVehiculo,
  upVehiculo,
  orderByEstado,
  filterByPatente,
};
