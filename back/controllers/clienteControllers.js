const clienteModel = require('../models/clientesModels');

const getAllClientes = async (req, res) => {
    try {
        const clientes = await clienteModel.getAllClientes();
        res.json(clientes);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener vehículos.' });
    }
};

const createCliente = async (req, res) => {
    try {
        const { nombre, apellido, idLocalidad } = req.body;
        await clienteModel.createCliente(nombre, apellido, idLocalidad);
        res.status(201).json({ message: 'Cliente agregado correctamente.' });
    } catch (err) {
        res.status(500).json({ error: 'Error al agregar el cliente.' });
    }
};

const dropCliente = async (req, res) => {
    try {
        const clienteId = req.params.id;
        await clienteModel.dropCliente(clienteId);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el cliente.' });
    }
};

const updateCliente = async (req, res) => {
    try {
        const { nombre, apellido, idLocalidad, id } = req.body;
        await clienteModel.updateCliente(nombre, apellido, idLocalidad, id);
        res.status(200).json({ message: 'Cliente actualizado exitosamente.' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el cliente.' });
    }
};

module.exports = {
    getAllClientes,
    createCliente,
    dropCliente,
    updateCliente
}
