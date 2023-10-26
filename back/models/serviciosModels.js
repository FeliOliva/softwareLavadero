const db = require('../database');
const queries = require('../querys/querieServicio');


const getAllServicios = async () => {
    try {
        const [rows] = await db.query(queries.getAllServicios);
        return rows;
    } catch (err) {
        throw err;
    }
};

const createServicio = async (nombre, costo, idTipoVehiculo) => {
    try {
        const query = queries.createServicio;
        await db.query(query, [nombre, costo, idTipoVehiculo]);
    } catch (err) {
        throw err;
    }
};


const dropServicio = async (id) => {
    try {
        const query = queries.dropServicio;
        await db.query(query, [id]);
    } catch (err) {
        throw err;
    }

};

const updateServicio = async (nombre, costo, idTipoVehiculo, id) => {
    try {
        const query = queries.updateServicio;
        await db.query(query, [nombre, costo, idTipoVehiculo, id]);
    } catch (err) {
        throw err;
    }
};

module.exports ={
    getAllServicios,
    createServicio,
    dropServicio,
    updateServicio
}