module.exports = {
  getAllVehiculos: `
    SELECT vehiculo.id, vehiculo.patente, cliente.nombre AS cliente_nombre, tipoVehiculo.tipo AS tipo_vehiculo, modelo.nombre AS modelo_nombre, vehiculo.estado
    FROM vehiculo
    INNER JOIN cliente ON vehiculo.idCliente = cliente.id
    INNER JOIN tipoVehiculo ON vehiculo.idTipoVehiculo = tipoVehiculo.id
    INNER JOIN modelo ON vehiculo.idModelo = modelo.id
    INNER JOIN marca ON modelo.idMarca = marca.id
    ORDER BY vehiculo.id;
    `,
  createVehiculo:
    "INSERT INTO vehiculo (patente, idTipoVehiculo, idModelo, idCliente) VALUES (?, ?, ?, ?)",
  dropVehiculo: 'UPDATE vehiculo set estado = "eliminado" where id = ?',
  upVehiculo: 'UPDATE vehiculo set estado = "activo" where id = ?',
  updateVehiculo:
    "UPDATE vehiculo set patente= ?, idTipoVehiculo = ?, idModelo = ?, idCliente = ? where id = ?",
  filterByPatente: `SELECT 
  vehiculo.id, 
  vehiculo.patente, 
  cliente.nombre AS cliente_nombre, 
  tipoVehiculo.tipo AS tipo_vehiculo, 
  modelo.nombre AS modelo_nombre, 
  vehiculo.estado
FROM vehiculo
INNER JOIN cliente ON vehiculo.idCliente = cliente.id
INNER JOIN tipoVehiculo ON vehiculo.idTipoVehiculo = tipoVehiculo.id
INNER JOIN modelo ON vehiculo.idModelo = modelo.id
INNER JOIN marca ON modelo.idMarca = marca.id
WHERE vehiculo.patente LIKE ? 
ORDER BY vehiculo.id;`,
  // filterByModelo: "select * from vehiculo where idModelo like ? ",
  // filterByTipoVeh: "select * from vehiculo where idTipoVehiculo like ? ",
  orderByEstado: `
  SELECT vehiculo.id, vehiculo.patente, cliente.nombre AS cliente_nombre, tipoVehiculo.tipo AS tipo_vehiculo, modelo.nombre AS modelo_nombre, vehiculo.estado
  FROM vehiculo
  INNER JOIN cliente ON vehiculo.idCliente = cliente.id
  INNER JOIN tipoVehiculo ON vehiculo.idTipoVehiculo = tipoVehiculo.id
  INNER JOIN modelo ON vehiculo.idModelo = modelo.id
  INNER JOIN marca ON modelo.idMarca = marca.id
  ORDER BY vehiculo.estado;
  `,
};
