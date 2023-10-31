const clienteModel = require("../models/clientesModels");

const getAllClientes = async (req, res) => {
  try {
    const clientes = await clienteModel.getAllClientes();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener vehículos." });
  }
};

const createCliente = async (req, res) => {
  try {
    const { nombre, apellido, idLocalidad } = req.body;
    await clienteModel.createCliente(nombre, apellido, idLocalidad);
    res.status(201).json({ message: "Cliente agregado correctamente." });
  } catch (err) {
    res.status(500).json({ error: "Error al agregar el cliente." });
  }
};

const dropCliente = async (req, res) => {
  try {
    const clienteId = req.params.id;
    await clienteModel.dropCliente(clienteId);
    res.status(204).send("Se ha eliminado con exito (Emilio)");
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el cliente." });
  }
};

const upCliente = async (req, res) => {
  try {
    const clienteId = req.params.id;
    await clienteModel.upCliente(clienteId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el cliente." });
  }
};

const updateCliente = async (req, res) => {
  try {
    const { nombre, apellido, idLocalidad, id } = req.body;
    await clienteModel.updateCliente(nombre, apellido, idLocalidad, id);
    res.status(200).json({ message: "Cliente actualizado exitosamente." });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el cliente." });
  }
};

const filterByNombre = async (req, res) => {
  try {
    const { nombre } = req.query;
    const clientesFiltrados = await clienteModel.filterByNombre(nombre);
    res.json(clientesFiltrados);
  } catch (err) {
    res.status(500).json({ error: "Error al filtrar clientes." });
  }
};

const orderByEstado = async (req, res) => {
  try {
    const clientesxEstado = await clienteModel.orderByEstado();
    res.json(clientesxEstado);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los clientes." });
  }
};

module.exports = {
  getAllClientes,
  createCliente,
  dropCliente,
  updateCliente,
  upCliente,
  filterByNombre,
  orderByEstado,
};
