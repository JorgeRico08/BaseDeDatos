// Archivo para hacer la conexion a mysql 
// primero debemos instalar mysql
// npm i mysql 
// despues importamos el modulo 
const mysql = require('mysql');
// creamos un objecto js para almacenar todos los datos que se necesitan para la conexion 
const { mysql_database } = require('./confingSQL');

// realizamos la conexion y la asignamos a una constante 
const connection = mysql.createConnection(mysql_database) //le pasamos como parametro, los datos necesarios para la conexion
// iniciamos la conexion 
connection.connect((err, conn)=>{
    // si existe un error al iniciar la conexion 
    if (err) {
        console.log('A ocurrido un error: ')
        console.log(err.message);
    } else {
        console.log('conexion exitosa a mysql');
        // devolvemos la cionexion 
        return conn;
    }
})

// exportamos el modulo de conexion (vease index.js)
module.exports = connection