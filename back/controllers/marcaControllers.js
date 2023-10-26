const marcaModels = require('../models/marcaModels');

const getAllMarcas = async (req, res) => {
    try {
        const modelos = await marcaModels.getAllMarcas();
        res.json(modelos);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener vehículos.' });
    }
};

module.exports = {
    getAllMarcas

}