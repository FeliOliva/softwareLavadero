module.exports = {
  getAllClientes: ` SELECT cliente.id, cliente.nombre,cliente.apellido, localidad.nombre AS localidad, cliente.estado
        FROM cliente
        INNER JOIN localidad ON cliente.idLocalidad = localidad.id
        ORDER BY cliente.id`,
  createCliente:
    "INSERT INTO cliente (nombre, apellido, idLocalidad) VALUES (?, ?, ?)",
  dropCliente: 'UPDATE cliente set estado = "eliminado" where id = ?',
  upCliente: 'UPDATE cliente set estado = "activo" where id = ?',
  updateCliente:
    "UPDATE cliente set nombre= ?, apellido = ?, idLocalidad = ? where id = ?",
  filterByNombre: "select * from cliente where nombre like ?",
  orderByEstado: ` SELECT cliente.id, cliente.nombre,cliente.apellido, localidad.nombre AS localidad, cliente.estado
        FROM cliente
        INNER JOIN localidad ON cliente.idLocalidad = localidad.id
        ORDER BY cliente.estado`,
};
