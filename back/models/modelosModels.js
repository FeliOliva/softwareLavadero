const db = require('../database');
const queries = require('../querys/queriesModelos');


const getAllModelos = async () => {
    try {
        const [rows] = await db.query(queries.getAllModelos);
        return rows;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getAllModelos,
}