// database.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'lavadero',
});

connection.connect((err) => {
  if (err) {
    console.error('-----Error al conectar a la base de datos:----------------------------------------------------------');
    console.error('', err);
    console.error('----------------------------------------------------------------------------------------------------');
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});


module.exports = connection.promise();
