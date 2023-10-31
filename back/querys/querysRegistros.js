module.exports = {
  getAllRegistros: `SELECT registroServicio.id, registroServicio.hora, registroServicio.fecha, registroServicio.estado, cliente.nombre as idCliente, vehiculo.patente as idVehiculo, servicio.nombre AS idServicio
  FROM registroServicio
  INNER JOIN cliente ON registroServicio.idCliente = cliente.id
  INNER JOIN vehiculo ON registroServicio.idVehiculo = vehiculo.id
  INNER JOIN servicio ON registroServicio.idServicio = servicio.id
  ORDER BY registroServicio.id`,
  createRegistro:
    "INSERT INTO registroServicio(hora, fecha, idCliente, idVehiculo, idServicio) VALUES (?, ?, ?, ?, ?)",
  dropRegistro: 'UPDATE registroServicio set estado = "eliminado" where id = ?',
  upRegistro: 'UPDATE registroServicio set estado = "activo" where id = ?',
  updateRegistro:
    "UPDATE registroServicio set hora = ?, fecha = ?, idCliente = ?, idVehiculo = ?, idServicio = ? where id = ?",
  filterByID: `SELECT 
  registroServicio.id, 
  registroServicio.hora, 
  registroServicio.fecha, 
  registroServicio.estado, 
  cliente.nombre as idCliente, 
  vehiculo.patente as idVehiculo, 
  servicio.nombre AS idServicio
FROM registroServicio
INNER JOIN cliente ON registroServicio.idCliente = cliente.id
INNER JOIN vehiculo ON registroServicio.idVehiculo = vehiculo.id
INNER JOIN servicio ON registroServicio.idServicio = servicio.id
WHERE registroServicio.id = ?
ORDER BY registroServicio.id;`,
  orderByEstado: ` SELECT registroServicio.id, registroServicio.hora, registroServicio.fecha, registroServicio.estado, cliente.nombre as idCliente, vehiculo.patente as idVehiculo, servicio.nombre AS idServicio
  FROM registroServicio
  INNER JOIN cliente ON registroServicio.idCliente = cliente.id
  INNER JOIN vehiculo ON registroServicio.idVehiculo = vehiculo.id
  INNER JOIN servicio ON registroServicio.idServicio = servicio.id
  ORDER BY registroServicio.estado`,
};
