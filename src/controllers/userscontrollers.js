const { redirect } = require('express/lib/response');
// const path = require('path');
// const root = path.join(__dirname,'../public')

// const user = [
//     {id:0, name:'Carlos', age:20},
//     {id:1, name:'Pablo', age:12},
//     {id:2, name:'Juan', age:18},
// ]



// para hacer uso de nuestra base de datos mysql, debemos importar la conexion 
const connection = require('../connectionSQL');

// Para poder gestionar nuestra base de datos en MongoDB es necesdario importar el modelo 
const User = require('../models/users')

// definimos funcionalidades que devolveran las rutas de users.js
const getUsers = (req, res)=>{
    // se envia como respuesta, el mensaje "Accediendo a users" de tipo texto plano
    // res.send("Accediendo a usuarios")
    // envia un archivo html como respuesta 
    // res.sendFile('NombreArchivo',{root:ruta})
    // res.sendFile('users.html',{root:root})


    // ------------------------    enciando datos de un array 
    // // *********    Utilizando un motor de plantilla (ejs)   **************
    // res.render('users',{users:user}); //podemos mandar informacion {numbreDato:valor}

    // ******************************  MYSQL ************************************
    // ----------------------     enviando datos de una base de datos mysql 
    // definimos la consulta a ejecutar 
    // const sql = 'select * from users';
    // // ejecutamos la consulta 
    // connection.query(sql, (err, result)=>{  // query(consulta, funcion callback)
    //     // si sucede algu error 
    //     if (err) {
    //        console.log('Ah ocurrido un error');
    //        console.log(err.message);
    //     } else {
    //         // si la consulta es exitosa 
    //     //    imprimimos los datos por consola 
    //     console.log(result);
    //     res.render('users',{users:result});
    //     }
    // })

    // *********************************  MongoDB **************************************

    // ejecutamos una consulta (en este caso trae todos los archivos)
    User.find({/**Se debe especificar filtros para la consulta aqui si se desea */}, (err, result)=>{ 
        // si sucede algu error 
        if (err) {
           console.log('Ah ocurrido un error');
           console.log(err.message);
        } else {
            // si la consulta es exitosa 
        //    imprimimos los datos obtenidos por consola 
        console.log(result);
        // renderiza la vista users.els y le paso los datos obtenidos 
        res.render('users',{users:result});
        }
    })

};

const getCreateUsers = (req, res)=>{
        // se envia como respuesta, el mensaje "Accediendo a users" de tipo texto plano
    // res.send("Creando un usuario")
    // res.sendFile('create-user.html',{root:root})

    // *********    Utilizando un motor de plantilla (ejs)   **************
    res.render('create-user');
}

const getDeleteUsers = (req, res)=>{
        // se envia como respuesta, el mensaje "Accediendo a users" de tipo texto plano
    // res.send("Eliminando un usuario")
    // res.sendFile('delete-user.html',{root:root})

    // *********    Utilizando un motor de plantilla (ejs)   **************
    // res.render('delete-user');

    // *********************   MYSQL *****************************
    // const param = req.params.id;
    // const sql = `select * from users where id = ${param}`;
    // // ejecutamos la consulta 
    // connection.query(sql, (err, result)=>{  // query(consulta, funcion callback)
    //     // si sucede algun error 
    //     if (err) {
    //        console.log('Ah ocurrido un error');
    //        console.log(err.message);
    //     } else {
    //         // si la consulta es exitosa 
    //     //    imprimimos los datos por consola 
    //     console.log(result);
    //     res.render('delete-user',{users:result});
    //     }
    // })

    // *****************************  MongoDB ^*********************************
    const param = req.params.id;
    // ejecutamos la consulta para obtener los datos a eliminar
    User.find({_id:param}, (err, result)=>{  // query(consulta, funcion callback)
        // si sucede algun error 
        if (err) {
           console.log('Ah ocurrido un error');
           console.log(err.message);
        } else {
            // si la consulta es exitosa 
        //    imprimimos los datos por consola 
        console.log(result);
        res.render('delete-user',{users:result});
        }
    })
}

const getUpdateUsers =  (req, res)=>{
        // se envia como respuesta, el mensaje "Accediendo a users" de tipo texto plano
    // res.send("Modificando un usuario")
    // res.sendFile('update-user.html',{root:root})

    // *********    MYSQL   **************
    // const param = req.params.id
    // const sql = 'select * from users where id = ?'
    // connection.query(sql,param,(err, result)=>{
    //     if (err) {
    //         console.log('A ocurrido un error: ');
    //         console.log(err.message);
    //     } else {
    //         console.log(result);
    //         res.render('update-user',{users:result});
    //     }
    // })


    // **************************  MongoDB **********************************
    const param = req.params.id
    // modelo.find()
    User.find({_id:param},(err, result)=>{
        if (err) {
            console.log('A ocurrido un error: ');
            console.log(err.message);
        } else {
            console.log(result);
            res.render('update-user',{users:result});
        }
    })
}

// const createUser = 

const updateUser = (req, res)=>{
    // para obtener el paramentro "id" que viene en la url 
    // const param = req.params.id;
    // for (let i = 0; i < user.length; i++) {
    //     if (param == user[i].id) {
    //         user[i].nombre = req.body.nombre;
    //         user[i].edad = req.body.edad;
    //         // salir del ciclo 
    //         break;
    //     }  
    // }
    // renderizar la vista de los usuarios 
    // res.render('users',{users:user})
    // *******************************  MYSQL  ****************************************
    // const param = req.params.id;
    // console.log('id: '+param)
    // const sql = `update users SET name='${req.body.name}', age='${req.body.age}' where id = ${param}`;
    // connection.query(sql, (err, result)=>{
    //     if (err) {
    //         console.log('A ocurrido un error al actualizar')
    //         console.log(err.message)
    //     } else {
    //         console.log('Datos acutailizados correctamente');
    //         res.redirect('/users/all')
    //     }
    // })

    // ********************************** MongoDB **************************************
    const param = req.params.id;
    const data = req.body;
    // modelo.findOneAndUpdate({consulta},datos a actualizar, funcion callback)
    User.findOneAndUpdate({_id:param},data, (err, result)=>{
        if (err) {
            console.log('A ocurrido un error al actualizar')
            console.log(err.message)
        } else {
            console.log('Datos acutailizados correctamente');
            res.redirect('/users/all')
        }
    })
}

const deleteUser = (req, res)=>{
    // para obtener el paramentro "id" que viene en la url 
    // const param = req.params.id;
    // for (let i = 0; i < user.length; i++) {
    //     if (param == user[i].id) {
            // metodo para eliminar el documento del array 
    //         user.splice(i, 1)
    //     }  
    // }
    // renderizar la vista de los usuarios 
    // res.render('users',{users:user})


    // *********************   mysql *****************************
    // const param = req.params.id;
    // const sql = `delete from users where id = ${param}`;
    // connection.query(sql, (err, result)=>{
    //     if (err) {
    //         console.log('A ocurrido un error al eliminar')
    //         console.log(err.message)
    //     } else {
    //         console.log('Dato eliminado correctamente');
    //         res.redirect('/users/all')
    //     }
    // })

    // *************************  MongoDb ***********************************
    // obtenemos el id del usuario a eliminar 
    const param = req.params.id;
    User.deleteOne({_id:param}, (err, result)=>{
        if (err) {
            console.log('A ocurrido un error al eliminar')
            console.log(err.message)
        } else {
            console.log('Dato eliminado correctamente');
            res.redirect('/users/all')
        }
    })
}


// exportamos las funcionalidades para que sean accesibles por los demas archivos
module.exports = {getUsers, getCreateUsers, getDeleteUsers, getUpdateUsers, /*createUser,*/ deleteUser, updateUser};