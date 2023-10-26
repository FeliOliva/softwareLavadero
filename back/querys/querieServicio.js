module.exports = {
    getAllServicios: `SELECT servicio.id, servicio.nombre, servicio.costo, tipoVehiculo.tipo AS tipo_vehiculo, servicio.estado
    FROM servicio
    INNER JOIN tipoVehiculo ON servicio.idTipoVehiculo = tipoVehiculo.id
    ORDER BY servicio.id;`,
    createServicio : 'INSERT INTO servicio (nombre, costo,idTipoVehiculo) VALUES (?, ?, ?)',
    dropServicio: 'UPDATE servicio set estado = "eliminado" where id = ?',
    updateServicio: 'UPDATE servicio set nombre= ?, costo = ?, idTipoVehiculo = ? where id = ?',
}