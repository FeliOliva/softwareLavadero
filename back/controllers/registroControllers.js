const registroModels = require("../models/registroModels");

const getAllRegistros = async (req, res) => {
  try {
    const registros = await registroModels.getAllRegistros();
    res.json(registros);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los registros." });
  }
};

const createRegistro = async (req, res) => {
  try {
    const { hora, fecha, idCliente, idVehiculo, idServicio } = req.body;
    await registroModels.createRegistro(
      hora,
      fecha,
      idCliente,
      idVehiculo,
      idServicio
    );
    res.status(201).json({ message: "Registro agregado correctamente." });
  } catch (err) {
    res.status(500).json({ error: "Error al agregar el registro." });
  }
};

const dropRegistro = async (req, res) => {
  try {
    const registroId = req.params.id;
    await registroModels.dropRegistro(registroId);
    res.status(204).send("Se ha eliminado con exito");
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el registro." });
  }
};

const upRegistro = async (req, res) => {
  try {
    const registroId = req.params.id;
    await registroModels.upRegistro(registroId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el registro." });
  }
};

const updateRegistro = async (req, res) => {
  try {
    const { hora, fecha, idCliente, idVehiculo, idServicio, id } = req.body;
    await registroModels.updateRegistro(
      hora,
      fecha,
      idCliente,
      idVehiculo,
      idServicio,
      id
    );
    res.status(200).json({ message: "Registro actualizado exitosamente." });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el registro." });
  }
};

const filterByID = async (req, res) => {
  try {
    const registroId = req.params.id;
    const registro = await registroModels.filterByID(registroId);
    if (!registro) {
      return res.status(404).json({ message: "Registro no encontrado." });
    }
    res.json(registro);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el registro." });
  }
};

const orderByEstado = async (req, res) => {
  try {
    const registroxEstado = await registroModels.orderByEstado();
    res.json(registroxEstado);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los registros." });
  }
};

module.exports = {
  getAllRegistros,
  createRegistro,
  dropRegistro,
  upRegistro,
  updateRegistro,
  filterByID,
  orderByEstado,
};
