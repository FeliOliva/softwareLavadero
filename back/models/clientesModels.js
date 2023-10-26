const db = require('../database');
const queries = require('../querys/queriesCliente');

const getAllClientes = async () => {
    try {
        const [rows] = await db.query(queries.getAllClientes);
        return rows;
    } catch (err) {
        throw err;
    }
};

const createCliente = async (nombre, apellido, idLocalidad) => {
    try {
        const query = queries.createCliente;
        await db.query(query, [nombre, apellido, idLocalidad]);
    } catch (err) {
        throw err;
    }
};


const dropCliente = async (id) => {
    try {
        const query = queries.dropCliente;
        await db.query(query, [id]);    
    } catch (err) {
        throw err;
    }

};

const updateCliente = async (nombre, apellido, idLocalidad, id) => {
    try {
        const query = queries.updateCliente;
        await db.query(query, [nombre, apellido, idLocalidad, id]);
    } catch (err) {
        throw err;
    }
};
module.exports = {
    getAllClientes,
    createCliente,
    dropCliente,
    updateCliente
}