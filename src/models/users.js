// Un modelo es aquel que define la estructura de los datos, en la base de datos, 
// este nos ayuda a manipular la base de datos   

// importamos mongoose 
const mongoose = require('mongoose');
// Importamos la clase esquema de mongoose, esto para crear nuestro esquema de datos 
const Schema = mongoose.Schema;

// Creamos un esquema 
const UserSchema = new Schema({
    name: String,
    ApePaterno: String,
    ApeMaterno: String,
    age: Number,
    gmail:String,
    curp:String,
    domicilio:String,
    telefono:Number,
    ciudad:String,
    fechaRegistro:{
        type: Date,
        default: () => Date.now(),
    },
    // modelo de la imagen 
    img: {
        type: String,
        default: 'placeholder.jpg',
      },
      username:String,
      password:String,
    //   usuariosConfi:[{
    //       nombre:String,
    //       ApePaterno:String,
    //       ApeMaterno:String,
    //       telefono:Number
    //   }]
})

// para acceder al esquema, creamos un modelo mongoose 
const User = mongoose.model('User' /**Nombre del modelo */, UserSchema /**Esquema del modelo*/)

// exportamos nuestro modelo 
module.exports = User;