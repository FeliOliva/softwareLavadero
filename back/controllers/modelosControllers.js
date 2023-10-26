const modelModel = require('../models/modelosModels');

const getAllModelos = async (req, res) => {
    try {
        const modelos = await modelModel.getAllModelos();
        res.json(modelos);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los modelos.' });
    }
};

module.exports ={
    getAllModelos,
}