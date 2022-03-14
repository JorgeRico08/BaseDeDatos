// Manejo de todas las rutas de usuario 

// ***********************  Subir imagenes **********************************
// Para subir imagenes 
const multer = require('multer');
const User = require('../models/users')

//definimos donde se aguardara los imagenes 

const storage = multer.diskStorage({
    //definimos la ruta donde se almacenaran 
    destination: function (request, file, callback) {
      callback(null,'./src/public/');
    },
  
    //Añadimos el nombre y la extencion del archivo
    filename: function (request, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  });
  
  //defininos los parametros de multer
  const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
  });

// importamos express 
const express = require('express');
// Hacemos uso de la funcion Router de express para crear nuestras rutas de usuario 
const router = express.Router();
// exportamos las funcionalidades a devolver, definidas en usercontrollers
const usersControllers = require('../controllers/userscontrollers');

// creamos una ruta con nuestros router 
//            (ruta, funcion a ejecutar)
router.get('/all', usersControllers.getUsers);
//            (ruta, funcion a ejecutar)
router.get('/create', usersControllers.getCreateUsers);
//            (ruta, funcion a ejecutar)
router.get('/update/:id', usersControllers.getUpdateUsers);
//            (ruta, funcion a ejecutar)
router.get('/delete/:id', usersControllers.getDeleteUsers);

router.get('/consult',(req, res)=>{
    res.render('consult-user',{});
})

// Ruta para crear usuarios 
router.post('/create',upload.single('image-ine'), (req, res)=>{
    console.log(req.body); //con body podemos ver los datos que envia el usuario por medio de un formulario para crear un usuario
    // agregamos la inofrmacion enviada al array de usuarios
    // user.push(req.body);
    // mostramos la vista en dode estan todos los usuarios registrados 
    // res.render('users', {users:user})

    // *****************************  MYSQL ***********************************
    // const sql = 'insert into users SET ?'; // ? define un parametro
    // // obtenemos los datos enviados 
    // const data =  req.body;
    // // ejecutamos la insercion 
    // connection.query(sql,data,(err, result)=>{ // la consulta, el parametro, funcion callback
    //     if (err) {
    //         console.log('A ocurrido un error: ');
    //         console.log(err.message);
    //     } else {
    //         console.log('Datos insertados')
    //         // otra opcion para mostrar la vista es el metodo redirect, la cual tiene como argumento, la url a donde nos enviara 
    //         res.redirect('/users/all');
    //     }
    // })

    // ********************************** MongoDB ************************************
    // obtenemos los datos enviados 
    const data =  req.body;
    console.log('contenido de la solicitud');
    console.log(req.file);
    // especificamos los datos a insertar en mongo, con ayuda del modelo 
    const user = new User({
        name: data.name,
        ApePaterno: data.ApePaterno,
        ApeMaterno: data.ApeMaterno,
        age: data.age,
        gmail:data.gmail,
        curp:data.curp,
        domicilio:data.domicilio,
        telefono:data.telefono,
        ciudad:data.ciudad,
        img: req.file.filename,
        username:data.username,
        password:data.password
    })
    // ejecutamos la insercion, colocando los datos a enviar.save(...) 
    user.save((err, result)=>{ // la consulta, el parametro, funcion callback
        if (err) {
            console.log('A ocurrido un error: ');
            console.log(err.message);
        } else {
            console.log('Datos insertados')
            // otra opcion para mostrar la vista es el metodo redirect, la cual tiene como argumento, la url a donde nos enviara 
            res.redirect('/users/all');
        }
    })
});

// Ruta para actualizar datos 
// para actualizar un determinao usuario, debemos mandar en la url un parametro, el cual sera el id para poderlo identificar
// para colocar un parametro se debe colocar e la siguiente forma /:[parametro]
router.post('/update/:id',usersControllers.updateUser);

// Ruta para eliminar usuario
router.post('/delete/:id',usersControllers.deleteUser);

router.post('/consult/nombre/',(req, res)=>{
  console.log(req.body.name);
  const nombre = req.body.name;
  //const param = req.params.name;
  // ejecutamos la consulta para obtener los datos a eliminar
  User.find({name:nombre}, (err, result)=>{
      // si sucede algun error 
      if (err) {
         console.log('Ah ocurrido un error');
         console.log(err.message);
      } else {
          // si la consulta es exitosa 
      //    imprimimos los datos por consola 
      console.log(result);
      res.render('users',{users:result});
      }
  })
});

router.post('/consult/edad',(req, res)=>{
  const data = req.body;
  console.log(req.body.edadmin);
  console.log(req.body.edadmax);
  const edadminima = data.edadmin;
  const edadmaxima = data.edadmax;
  User.find({$and: [{age : { $gte: edadminima }}, {age : { $lte: edadmaxima }}]}, (err, result)=>{
      if (err) {
         console.log('Ah ocurrido un error');
         console.log(err.message);
      } else {
      console.log(result);
      res.render('users',{users:result});
      }
  })
});

router.post('/consult/correo',(req, res)=>{
  const data = req.body;
  const correob = data.correo;
  if (correob == 'gmail') {
    User.find({gmail:/gmail/}, (err, result)=>{
      if (err) {
         console.log('Ah ocurrido un error');
         console.log(err.message);
      } else {
      console.log(result);
      res.render('users',{users:result});
      }
  })
    
  } else {

    User.find({gmail:/hotmail/}, (err, result)=>{
      if (err) {
         console.log('Ah ocurrido un error');
         console.log(err.message);
      } else {
      console.log(result);
      res.render('users',{users:result});
      }
  })
    
  }

});

router.post('/consult/curp',(req, res)=>{
  const data = req.body;
  const curpa = data.curp;
  User.find({curp:curpa}, (err, result)=>{
    if (err) {
       console.log('Ah ocurrido un error');
       console.log(err.message);
    } else {
    console.log(result);
    res.render('users',{users:result});
    }
})
});



// exportamos nuestras rutas (router) para que sean accesibles para otros archivos 
module.exports = router;