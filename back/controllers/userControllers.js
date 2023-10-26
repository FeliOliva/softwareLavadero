const userModel = require('../models/userModels');


//para el usuario
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios.' });
  }
};


// // Obtener un solo usuario por su ID (GET)
// const getUserById = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = await userModel.getUserById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'Usuario no encontrado.' });
//     }
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener el usuario.' });
//   }
// };


// const deleteUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = await userModel.deleteUser(userId);

//     return res.status(201).json({ message: 'Usuario Eliminado.' + req.params.id});
// /*     if (!user) {
//       return res.status(404).json({ message: 'Usuario no encontrado.' });
//     }
//     res.json(user); */
//   } catch (err) {
//     res.status(500).json({ error: 'Error al eliminar el usuario. 52' });
//   }
// };


module.exports = {
  getAllUsers,
};
