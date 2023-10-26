const servicioModel = require('../models/serviciosModels');


const getAllServicios = async (req, res) => {
    try {
        const servicios = await servicioModel.getAllServicios();
        res.json(servicios);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener vehículos.' });
    }
};

const createServicio = async (req, res) => {
    try {
        const { nombre, costo, idTipoVehiculo } = req.body;
        await servicioModel.createServicio(nombre, costo, idTipoVehiculo);
        res.status(201).json({ message: 'Servicio agregado correctamente.' });
    } catch (err) {
        res.status(500).json({ error: 'Error al agregar el servicio.' });
    }
};

const dropServicio = async (req, res) => {
    try {
        const servicioId = req.params.id;
        await servicioModel.dropServicio(servicioId);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el servicio.' });
    }
};

const updateServicio = async (req, res) => {
    try {
        const { nombre, costo, idTipoVehiculo, id } = req.body;
        await servicioModel.updateServicio(nombre, costo, idTipoVehiculo, id);
        res.status(200).json({ message: 'Servicio actualizado exitosamente.' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el servicio.' });
    }
};


module.exports = {
    getAllServicios,
    createServicio,
    dropServicio,
    updateServicio
}