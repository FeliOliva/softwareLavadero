module.exports = {
    getAllUsers: 'SELECT * FROM usuario',
    getUserById: 'SELECT * FROM usuario WHERE id = ?',
    updateUser: 'UPDATE usuario SET nombre = ?, email = ? WHERE id = ?',
    deleteUser: 'DELETE FROM usuario WHERE id = ?',
    getAllModelos: 'SELECT * FROM modelo',
    getAllLocalidades: 'SELECT * FROM localidad',
    getAllTipoVeh: 'SELECT * FROM tipoVehiculo',
    getAllMarcas: 'SELECT * FROM marca',
};