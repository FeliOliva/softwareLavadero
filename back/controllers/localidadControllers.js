const localidadModel = require('../models/localidadModels');


const getAllLocalidades = async (req, res) => {
    try {
        const modelos = await localidadModel.getAllLocalidades();
        res.json(modelos);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener vehículos.' });
    }
};

module.exports = {
    getAllLocalidades
}