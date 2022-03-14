// Archivo para hacer la conexion a MongoDB
// primero debemos instalar mongoDB
// npm i mongoose
// despues importamos el modulo 
const mongoose = require('mongoose');
// creamos un objecto js para almacenar todos los datos que se necesitan para la conexion 
const { mongodb } = require('./confingMongoDB');

// realizamos la conexion y la asignamos a una constante 
const connection = mongoose.connect(`mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`)
// db contiene los datos de la base de datos 
.then((db)=>{
    console.log('Conexion exitosa a MongoDB')
}).catch((err)=>{
    console.log('Ah ocurrido un error: '+err.message)
})

// exportamos el modulo de conexion (vease index.js)
module.exports = connection