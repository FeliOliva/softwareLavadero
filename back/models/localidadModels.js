const db = require('../database');
const queries = require('../querys/queries');

const getAllLocalidades = async () => {
    try {
        const [rows] = await db.query(queries.getAllLocalidades);
        return rows;
    } catch (err) {
        throw err;
    }
};
module.exports = {
    getAllLocalidades
}