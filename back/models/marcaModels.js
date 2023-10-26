const db = require('../database');
const queries = require('../querys/queries');

const getAllMarcas = async () => {
    try {
        const [rows] = await db.query(queries.getAllMarcas);
        return rows;
    } catch (err) {
        throw err;
    }
};
module.exports = {
    getAllMarcas,
}