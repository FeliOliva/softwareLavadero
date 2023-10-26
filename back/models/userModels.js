const db = require('../database');
const queries = require('../querys/queries');


//usuarios
const getAllUsers = async () => {
  try {
    const [rows] = await db.query(queries.getAllUsers);
    return rows;
  } catch (err) {
    throw err;
  }
};


// //por id
// const getUserById = async (userId) => {
//   try {
//     const query = queries.getUserById;
//     const [rows] = await db.query(query, [userId]);
//     return rows[0];
//   } catch (err) {
//     throw err;
//   }
// };


// //actualizar
// const updateUser = async (nombre, email, id) => {
//   try {
//     const query = queries.updateUser;
//     await db.query(query, [nombre, email, id]);
//   } catch (err) {
//     throw err;
//   }
// };

// //delete
// const deleteUser = async (id) => {
//   try {
//     const query = queries.deleteUser;
//     await db.query(query, [id]);
//   } catch (err) {
//     throw err;
//   }

// };

module.exports = {
  getAllUsers,
};
